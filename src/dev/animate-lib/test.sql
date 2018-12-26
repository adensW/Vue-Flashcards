select id ,
zhaopinxxid,
 yingpinbmmc,
 zengbugwmc,
 gongsimc,
 sum(tongzhirs) as tongzhirs,
 sum(luyongrs) as luyongrs,
 sum(ruzhirs) as ruzhirs,
 sum(mianshirs) as mianshirs
 from (select 
outcanshu.id id,
outcanshu.zhaopinxxid zhaopinxxid,
outcanshu.yingpinbmmc yingpinbmmc,
outcanshu.gongsimc gongsimc,
outcanshu.zengbugwmc zengbugwmc,
outcanshu.tongzhirs tongzhirs,
outluyong.luyongrs luyongrs,
outruzhi.ruzhirs ruzhirs,
outmianshi.mianshirs mianshirs from 
(select a.id id, a.zhaopinxxid zhaopinxxid,a.yingpinbmmc yingpinbmmc,b.gongsimc gongsimc,c.zengbugwmc zengbugwmc,count(*) tongzhirs from  
	(select id,zengbugwmc from cmp_hr_01.hr_zhaopinxx_0001) c
    left join
    (select id ,zhaopinxxid,yingpinbmmc,dangqianzt,luyongzt,shijirzrq,chuangjianrq from cmp_hr_01.hr_yingpinxx_0001 where zuofeibz=0 and chuangjianrq between '2017-01-01' and '2018-10-1'
	and yingpinbmmc in 
		(select bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in 
			('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
			and zuofeibz=0 ) )a 
    on on a.zhaopinxxid = c.id
    left join 
    (select gongsimc,bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		) b
    on a.yingpinbmmc =b.bumenmc 
    
    
    
    group by zhaopinxxid
) outcanshu 
left join 
(select a.zhaopinxxid zhaopinxxid, count(*)luyongrs from  (select id ,zhaopinxxid,yingpinbmmc,dangqianzt,luyongzt,shijirzrq,chuangjianrq from cmp_hr_01.hr_yingpinxx_0001 
	where zuofeibz=0 and dangqianzt between 1 and 3 and chuangjianrq between '2017-01-01' and '2018-10-1'
	and yingpinbmmc in 
	(select bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in 
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		and zuofeibz=0 ) )a 
    left join 
    (select gongsimc,bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		) b
    on a.yingpinbmmc =b.bumenmc 
    left join 
    (select id,zengbugwmc from cmp_hr_01.hr_zhaopinxx_0001) c
		on a.zhaopinxxid = c.id
		group by zhaopinxxid) outluyong
		on outcanshu.zhaopinxxid = outluyong.zhaopinxxid
left join 
	(select a.zhaopinxxid zhaopinxxid, count(*)ruzhirs from  (select id ,zhaopinxxid,yingpinbmmc,dangqianzt,luyongzt,shijirzrq,chuangjianrq from cmp_hr_01.hr_yingpinxx_0001 
	where zuofeibz=0 and ruzhizt = 1 and shijirzrq between '2017-01-01' and '2018-10-1'
	and yingpinbmmc in 
    (select bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in 
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		and zuofeibz=0 ) )a 
    left join 
		(select gongsimc,bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		) b
    on a.yingpinbmmc =b.bumenmc 
    left join (select id,zengbugwmc from cmp_hr_01.hr_zhaopinxx_0001) c
    on a.zhaopinxxid = c.id
    group by zhaopinxxid) outruzhi
		on outcanshu.zhaopinxxid = outruzhi.zhaopinxxid
    left join 
	(select a.zhaopinxxid zhaopinxxid, count(*)mianshirs from  (select id ,zhaopinxxid,yingpinbmmc,dangqianzt,luyongzt,shijirzrq,chuangjianrq from cmp_hr_01.hr_yingpinxx_0001 
		where zuofeibz=0 and chuangjianrq between '2017-01-01' and '2018-10-1' and id in (select yingpinxxid from cmp_hr_01.hr_mianshixx_0001 where zuofeibz=0 and mianshizt =1)
		and yingpinbmmc in 
		(select bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in 
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		and zuofeibz=0 ) )a 
    left join 
    (select gongsimc,bumenmc from cmp_hr_01.hr_bumenxx_0001 where gongsiid in
		('294388285684326400','361165381261336576','512612407823048704','512617716297768960','512878962007875584','512881086573846528','513337147059609600','513595405146005504','518368269191618560','A','B','d','e','f','g','J','K','L','M','N','O','P','Q','R','S','T','U','X','Z') 
		) b
		on a.yingpinbmmc =b.bumenmc 
    left join (select id,zengbugwmc from cmp_hr_01.hr_zhaopinxx_0001) c
		on a.zhaopinxxid = c.id
		group by zhaopinxxid) outmianshi
    on outcanshu.zhaopinxxid = outmianshi.zhaopinxxid
where zengbugwmc in ('高级工程师','行政专员','总经理','ASP.NET开发工程师','主机工程师','客服工程师','前台')) outout
group by zengbugwmc