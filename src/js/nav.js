Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var millisecsInDay = 86400000;
    return Math.ceil((((this - onejan) /millisecsInDay) + onejan.getDay()+1)/7);
};

var navContainer = $('#nav-list');
var firstNav = $('.first-nav');
var activeNav = $('.active-nav');
var lastNav = $('.last-nav');
var thisWeek = new Date().getWeek();

activeNav.attr('data-week-value', thisWeek);
firstNav.children('a').text('Week ' + (thisWeek - 1));
firstNav.attr('data-week-value', thisWeek - 1);
lastNav.children('a').text('Week ' + (thisWeek + 1));
lastNav.attr('data-week-value', thisWeek + 1);