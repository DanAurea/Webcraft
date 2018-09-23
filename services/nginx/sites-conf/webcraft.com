server{

    server_name webcraft.com www.webcraft.com;

    resolver 127.0.0.11 valid=10s;

    root /var/www/webcraft.com/;
    listen 80;
    listen 443;

    index index.php index.html index.htm;

    ## Only allow these request methods ##
        if ($request_method !~ ^(GET|HEAD|POST)$ ) {
            return 444;
        }
    ## Do not accept DELETE, SEARCH and other methods ##

    ## Block download agents ##
        if ($http_user_agent ~* LWP::Simple|BBBike|wget) {
            return 403;
        }

    ## Deny certain Referers ###
        if ( $http_referer ~* (babes|forsale|girl|jewelry|love|nudit|organic|poker|porn|sex|teen) ){
            return 403;
        }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
        location ~ /\.ht {
            deny  all;
        }

    # Do not log robots.txt if not found
        location = /robots.txt  { access_log off; log_not_found off; }
    # Do not log favicon.ico if not found
        location = /favicon.ico { access_log off; log_not_found off; }  
    # Do not give access to hidden files
        location ~ /\.          { access_log off; log_not_found off; deny all; }
    # Do not give access to vim backuped files
        location ~ ~$           { access_log off; log_not_found off; deny all; }

    # Set nginx as a proxy reverse for gunicorn
        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Host $server_name;
            proxy_set_header X-Real-IP $remote_addr;
            
            ## Cache request to wsgi server (gunicorn here)
            proxy_cache          STATIC;
            proxy_cache_key      $host$uri$is_args$args;
            proxy_cache_valid    200 301 302 304 30m;
            proxy_cache_use_stale  error timeout invalid_header updating
                                   http_500 http_502 http_503 http_504;
            proxy_cache_revalidate on;
            proxy_cache_lock on;
                               
            expires              30m;
                                    
            proxy_buffering    off;
            proxy_buffer_size  128k;
            proxy_buffers 100  128k;
                                                   
            proxy_pass_header       Set-Cookie;
            proxy_pass_header X-CSRFToken; 
            
            proxy_redirect off;
            proxy_connect_timeout 10s;
            proxy_read_timeout 30s;
            
            proxy_pass http://webcraft:8000$uri?$args;
        }

        location = / {
            proxy_pass http://webcraft:8000/game/home;
        }

        location /ws {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_redirect     off;
            proxy_set_header   Host $host;
            proxy_set_header   X-Real-IP $remote_addr;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_pass http://webcraft:8001$uri?$args;
        }
        
    # Set nginx serving static contents
        location /static {
            alias   /var/www/webcraft.com/static/;
            log_not_found off;
            access_log off;
        }

    # Set cache for some static files
        location ~* \.(?:css|js|obj|woff|png|jpg|gif)$ {
            expires 1y;
            access_log off;
            add_header Cache-Control "public";
        }

    #access_log /var/www/webcraft.com/logs/access.log vhosts;
    #error_log /var/www/webcraft.com/logs/error.log;
    error_page 404 /404.html;
}
