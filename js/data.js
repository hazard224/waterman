/* Waterman Center for the Arts: site data.
   Edit classes and events here; the Classes page, Gallery page and search all read from this file.
   All entries below are SAMPLES until the schedule is set. */
window.WATERMAN = window.WATERMAN || {};
(function () {
  var CLASSES = [
    {t:"After-school art club",age:"kids",ages:"Ages 6 to 11",type:"Painting and drawing",day:"Tuesday",when:"Tuesdays, 3:30 to 5 pm",starts:"January 12",price:"$90 for 6 weeks",spots:"4 spots left",d:"Paint, cut, glue and build with a working artist."},
    {t:"Clay creatures",age:"kids",ages:"Ages 6 to 11",type:"Clay",day:"Saturday",when:"Saturdays, 10 to 11:30 am",starts:"January 16",price:"$75 for 4 weeks",spots:"6 spots left",d:"Hand-build animals and monsters, then glaze and take them home."},
    {t:"Family Saturday",age:"kids",ages:"All ages with a grown-up",type:"Painting and drawing",day:"Saturday",when:"Saturdays, 1 to 3 pm",starts:"January 16",price:"$15 per family",spots:"Drop in",d:"A one-afternoon project for kids and grown-ups to make together."},
    {t:"Teen portfolio studio",age:"teens",ages:"Ages 13 to 18",type:"Painting and drawing",day:"Wednesday",when:"Wednesdays, 4 to 6 pm",starts:"January 13",price:"$140 for 8 weeks",spots:"8 spots left",d:"Build a body of work for college applications and the spring student show."},
    {t:"Wheel throwing",age:"teens adults",ages:"Teens and adults",type:"Clay",day:"Thursday",when:"Thursdays, 6 to 8 pm",starts:"January 14",price:"$160 for 8 weeks",spots:"Full",full:true,d:"Center, pull and trim your first bowls and mugs."},
    {t:"Camera basics",age:"teens adults",ages:"Teens and adults",type:"Photography",day:"Monday",when:"Mondays, 6 to 7:30 pm",starts:"January 11",price:"$70 for 3 weeks",spots:"10 spots left",d:"Get off auto: exposure, light and composition with any camera or phone."},
    {t:"Drawing fundamentals",age:"adults",ages:"Adults",type:"Painting and drawing",day:"Saturday",when:"Saturdays, 10 am to 12 pm",starts:"January 16",price:"$120 for 6 weeks",spots:"5 spots left",d:"Line, value and observation, from still life to the figure."},
    {t:"Watercolor landscapes",age:"adults",ages:"Adults",type:"Painting and drawing",day:"Tuesday",when:"Tuesdays, 6 to 8 pm",starts:"January 12",price:"$110 for 4 weeks",spots:"3 spots left",d:"Light, water and the hills around Bath."},
    {t:"Quilting circle",age:"adults",ages:"Adults",type:"Fiber and crafts",day:"Monday",when:"First Monday of the month, 1 to 3 pm",starts:"February 1",price:"$10 per session",spots:"Drop in",d:"Learn piecing and hand quilting from local makers."}
  ];
  var EVENTS = [
    {t:"Opening reception: New Work from Steuben County",d:"2026-11-13",s:"17:00",e:"20:00",x:"Meet the artists. Free and open to all."},
    {t:"Family Saturday: printmaking",d:"2026-11-21",s:"10:00",e:"13:00",x:"All ages, drop in. Materials provided."},
    {t:"Holiday makers market",d:"2026-12-05",s:"10:00",e:"16:00",x:"Handmade gifts from local artists."},
    {t:"Open studio afternoon",d:"2026-12-12",s:"13:00",e:"15:00",x:"Tour the classrooms and try a project."}
  ];
  window.WATERMAN.classes = CLASSES;
  window.WATERMAN.events = EVENTS;
  window.WATERMAN.typeColors = {
    "Painting and drawing": "var(--type-painting)",
    "Clay": "var(--type-clay)",
    "Fiber and crafts": "var(--type-fiber)",
    "Photography": "var(--type-photo)"
  };
})();
