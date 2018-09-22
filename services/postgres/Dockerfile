FROM postgres:10.5
MAINTAINER DanAurea <laochi.bc@gmail.com>

RUN localedef -i fr_FR -c -f UTF-8 -A /usr/share/locale/locale.alias fr_FR.UTF-8
ENV LANG fr_FR.utf8

# Default password for roles created by script below
ENV PGPASS=default
CMD ["/docker-entrypoint.sh","postgres"]