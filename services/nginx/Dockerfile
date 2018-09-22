FROM nginx:1.13.6
MAINTAINER DanAurea <laochi.bc@gmail.com>

# Load in all of our scripts.
RUN mkdir /var/www
ADD scripts/ 	/scripts

# Set connection settings and ping flood protection
RUN echo 'net.inet.tcp.fast_finwait2_recycle=1' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.maxtcptw=200000 ' >> /etc/sysctl.conf && \
echo 'kern.maxfiles=65535 ' >> /etc/sysctl.conf && \
echo 'kern.maxfilesperproc=16384 ' >> /etc/sysctl.conf && \
echo 'vm.pmap.pv_entry_max=54272521 ' >> /etc/sysctl.conf && \
echo 'vm.pmap.shpgperproc=20000 ' >> /etc/sysctl.conf && \
echo 'vfs.vmiodirenable=1' >> /etc/sysctl.conf && \
echo 'kern.ipc.somaxconn=3240000' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.rfc1323=1' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.delayed_ack=0' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.restrict_rst=1' >> /etc/sysctl.conf && \
echo 'kern.ipc.maxsockbuf=2097152 ' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.hostcache.hashsize=4096' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.hostcache.cachelimit=131072' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.hostcache.bucketlimit=120' >> /etc/sysctl.conf && \
echo 'net.inet.ip.portrange.first=2000' >> /etc/sysctl.conf && \
echo 'net.inet.ip.portrange.last=100000' >> /etc/sysctl.conf && \
echo 'net.inet.ip.portrange.hifirst=2000' >> /etc/sysctl.conf && \
echo 'net.inet.ip.portrange.hilast=100000' >> /etc/sysctl.conf && \
echo 'kern.ipc.semvmx=131068' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.msl=2000' >> /etc/sysctl.conf && \
echo 'net.inet.icmp.bmcastecho=1' >> /etc/sysctl.conf && \
echo 'net.inet.icmp.icmplim=1' >> /etc/sysctl.conf && \
echo 'net.inet.tcp.blackhole=2' >> /etc/sysctl.conf && \
echo 'net.inet.udp.blackhole=1' >> /etc/sysctl.conf

# Set port used
EXPOSE 80 443