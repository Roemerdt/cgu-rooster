$ ->

    $line = $('#line-1')
    $navListItem = $('#nav-list > .nav-li')
    $activeWidth = $('#nav-list > .active-nav').width()
    $firstChild = $('#nav-list > .nav-li:first-child')
    $defaultMarginLeft = parseInt($('.nav-li:first-child').next().css('marginLeft').replace(/\D/g, ''))
    $defaultPaddingLeft = parseInt($('nav > #nav-list').css('padding-left').replace(/\D/g, ''))

    $line.width($activeWidth + 'px')
    $line.css('left', $firstChild.position().left + 'px')

    $(window).resize ->
        $line = $('#line-1')
        $navListItem = $('#nav-list > .nav-li')
        $activeWidth = $('#nav-list > .active-nav').width()
        $firstChild = $('#nav-list > .nav-li:first-child')
        $defaultMarginLeft = parseInt($('.nav-li:first-child').next().css('marginLeft').replace(/\D/g, ''))
        $defaultPaddingLeft = parseInt($('nav > #nav-list').css('padding-left').replace(/\D/g, ''))

        $line.width($activeWidth + 'px')
        $line.css('left', $firstChild.position().left + 'px')

    $navListItem.click ->
        $this = $(this)
        $activeNav = $('#nav-list > .active-nav')
        $currentWidth = $activeNav.width()
        $currentOffset = $activeNav.position().left
        $currentIndex = $activeNav.index()
        $activeNav.removeClass('active-nav')
        $this.addClass('active-nav')
        $toSwitch = $this.text().toLowerCase()
        $activeDay = $('.active-day')
        $activeDay.removeClass('active-day')
        $('.' + $toSwitch).addClass('active-day')
        if not $this.is('#week')
            $('.flex-week').removeClass('week-view');

        if $this.index() > $currentIndex
            if $activeNav.is($firstChild)
                $initWidth = $defaultMarginLeft + $this.width() + $this.position().left - $firstChild.position().left
            else
                $initWidth = $this.position().left + $this.width() - $currentOffset

            $marginLeftToSet = $this.position().left + $defaultMarginLeft - $firstChild.position().left + 'px'

            $line.width($initWidth + 'px')
            setTimeout( ->
                $line.css('marginLeft', $marginLeftToSet)
                $line.width($this.width() + 'px')
            , 200)

        else
            if $this.is($firstChild)
                $initWidth = $currentOffset - $firstChild.position().left + $defaultMarginLeft + $currentWidth
                $marginLeftToSet = $this.position().left - $firstChild.position().left + 'px'
            else
                $initWidth = $currentWidth + $currentOffset - $this.position().left
                $marginLeftToSet = $this.position().left + $defaultMarginLeft - $firstChild.position().left + 'px'

            $line.css('marginLeft', $marginLeftToSet)
            $line.width($initWidth + 'px')
            setTimeout( ->
                $line.width($this.width() + 'px')
            , 200)