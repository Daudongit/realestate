(function ($) {

    

    $(window).setBreakpoints({
        // use only largest available vs use all available
        distinct: true,
        // array of widths in pixels where breakpoints
        // should be triggered
        breakpoints: [
            768,
            992
        ]
    });

    $(window).bind('enterBreakpoint992', function () {
        // on window resize
        $('.sidebar.left-side').css('left:0', 'display:block');
        // if open on mobile close on desktop
        if ($('body.sidebar-push-toright').length)  $('#showLeftPush').trigger('click');

        // on window resize remove remaining mobile style
        $('.email > .media-body').removeAttr("style");

        // make chat stick on desktop
        console.log('enterBreakpoint992');

    });
    $(window).bind('exitBreakpoint992', function () {
        console.log('exitBreakpoint992');
    });

    $(window).bind('exitBreakpoint768', function () {
        console.log('exitBreakpoint768');
    });
    $(window).bind('enterBreakpoint768', function () {
        // on window resize remove remaining mobile style
        $('.email > .media-body').removeAttr("style");

        console.log('enterBreakpoint768');
    });

}(jQuery));


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

(function ($) {

    'use strict';
    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (! hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

}(jQuery));



(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.blueDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').blueDatePicker();


    $.fn.blueTimePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.timepicker({
                minuteStep: 5,
                showInputs: false,
                disableFocus: true
            });

        }

    };


    $('#timepicker3').blueTimePicker({
        minuteStep: 5,
        showInputs: false,
        disableFocus: true
    });


})(jQuery);
(function ($) {

    $('.filestyle').filestyle({
        input:false,
        icon:false,
        buttonText:'Upload',
        buttonName:'btn-default'
    });

    $('#data-table').dataTable();

    // activate showMail toggle for under 768 px;
    $('[data-toggle="showMail"]').on('click', function () {
        if ($( window ).width() < 768) $('.email > .media-body').toggle();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('form.map-property-filter[data-form-disabled]').submit(false);


}(jQuery));

(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
if ($('#map-canvas').length > 0) {
    var myMap = function() {

        var	options = {
            zoom: 4,
            center: new google.maps.LatLng(38.810821,-95.053711),
            //mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles:
                [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#448aff"},{"visibility":"on"}]}]
        }

        /*
         Load the map then markers
         @param object settings (configuration options for map)
         @return undefined
         */
        function init(settings) {
            map = new google.maps.Map(document.getElementById( settings.idSelector ), options);
            markerLocation = settings.markerLocation;
            loadMarkers();
        }

        /*
         =======
         MARKERS
         =======
         */
        markers = {};
        markerList = [];

        /*
         Load markers onto the Google Map from a provided array or demo personData (data.js)
         @param array personList [optional] (list of people to load)
         @return undefined
         */
        function loadMarkers(personList) {

            // optional argument of person
            var people = ( typeof personList !== 'undefined' ) ? personList : personData;

            var j = 1; // for lorempixel

            for( i=0; i < people.length; i++ ) {
                var person = people[i];

                // if its already on the map, dont put it there again
                if( markerList.indexOf(person.id) !== -1 ) continue;

                var lat = person.lat,
                    lng = person.lng,
                    markerId = person.id;

                var infoWindow = new google.maps.InfoWindow({
                    maxWidth: 400
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng( lat, lng ),
                    title: person.name,
                    markerId: markerId,
                    icon: markerLocation,
                    map: map
                });

                markers[markerId] = marker;
                markerList.push(person.id);

                if( j > 10 ) j = 1; // for lorempixel, the thumbnail image
                var content = ['<div class="map-box"><img src="http://lorempixel.com/90/90/people/',
                    j, '" width="90" height="90">', '<div class="iw-text"><h4 class="margin-none">', person.name,
                    '</h4>Age: ', person.age, '<br/>Followers: ', person.followers,
                    '<br/>College: ', person.college, '</div></div>'].join('');
                j++; // lorempixel

                google.maps.event.addListener(marker, 'click', (function (marker, content) {
                    return function() {
                        infoWindow.setContent(content);
                        infoWindow.open(map, marker);
                    }
                })(marker, content));
            }
        }

        /*
         Remove marker from map and our list of current markers
         @param int id (id of the marker element)
         @return undefined
         */
        function removePersonMarker(id) {
            if( markers[id] ) {
                markers[id].setMap(null);
                loc = markerList.indexOf(id);
                if (loc > -1) markerList.splice(loc, 1);
                delete markers[id];
            }
        }

        /*
         ======
         FILTER
         ======
         */

        // default all filters off
        var filter = {
            followers: 0,
            college: 0,
            from: 0
        }
        var filterMap;

        /*
         Helper function
         @param array a (array of arrays)
         @return array (common elements from all arrays)
         */
        function reduceArray(a) {
            r = a.shift().reduce(function(res, v) {
                if (res.indexOf(v) === -1 && a.every(function(a) {
                        return a.indexOf(v) !== -1;
                    })) res.push(v);
                return res;
            }, []);
            return r;
        }

        /*
         Helper function
         @param string n
         @return bool
         */
        function isInt(n) {
            return n % 1 === 0;
        }


        /*
         Decides which filter function to call and stacks all filters together
         @param string filterType (the property that will be filtered upon)
         @param string value (selected filter value)
         @return undefined
         */
        function filterCtrl(filterType, value) {
            // result array
            var results = [];

            if( isInt(value) ) {
                filter[filterType] = parseInt(value);
            } else {
                filter[filterType] = value;
            }

            for( k in filter ) {
                if( !filter.hasOwnProperty(k) && !( filter[k] !== 0 ) ) {
                    // all the filters are off
                    loadMarkers();
                    return false;
                } else if ( filter[k] !== 0 ) {
                    // call filterMap function and append to r array
                    results.push( filterMap[k]( filter[k] ) );
                } else {
                    // fail silently
                }
            }

            if( filter[filterType] === 0 ) results.push( personData );

            /*
             if there is 1 array (1 filter applied) set it,
             else find markers that are common to every results array (pass every filter)
             */
            if( results.length === 1 ) {
                results = results[0];
            } else {
                results = reduceArray( results );
            }

            loadMarkers( results );

        }

        /*
         The keys in this need to be mapped 1-to-1 with the keys in the filter variable.
         */
        filterMap = {
            followers: function( value ) {
                return filterIntsLessThan('followers', value);
            },

            college: function( value ) {
                return filterByString('college', value);
            },

            from: function( value ) {
                return filterByString('from', value);
            }
        }

        /*
         Filters marker data based upon a string match
         @param string dataProperty (the key that will be filtered upon)
         @param string value (selected filter value)
         @return array (people that made it through the filter)
         */
        function filterByString( dataProperty, value ) {
            var people = [];

            for( var i=0; i < personData.length; i++ ) {
                var person = personData[i];
                if( person[dataProperty] == value ) {
                    people.push( person );
                } else {
                    removePersonMarker( person.id );
                }
            }
            return people;
        }

        /*
         Filters out integers that are under the provided value
         @param string dataProperty (the key that will be filtered upon)
         @param int value (selected filter value)
         @return array (people that made it through the filter)
         */
        function filterIntsLessThan( dataProperty, value ) {
            var people = [];

            for( var i=0; i < personData.length; i++ ) {
                var person = personData[i];
                if( person[dataProperty] > value ) {
                    people.push( person )
                } else {
                    removePersonMarker( person.id );
                }
            }
            return people;
        }

        // Takes all the filters off
        function resetFilter() {
            filter = {
                followers: 0,
                college: 0,
                from: 0
            }
        }

        return {
            init: init,
            loadMarkers: loadMarkers,
            filterCtrl: filterCtrl,
            resetFilter: resetFilter
        };
    }();
}
(function($) {

    if ($('#map-canvas').length > 0) {
        var mapConfig = {
            idSelector: 'map-canvas',
            markerLocation: 'images/marker.png'
        }
        myMap.init(mapConfig);

        $('.load-btn').on('click', function () {
            var $this = $(this);
            // reset everything
            $('select').val(0);
            myMap.resetFilter();
            myMap.loadMarkers();

            if ($this.hasClass('is-success')) {
                $this.removeClass('is-success').addClass('is-default');
            }
        });

        $('.followers-select').on('change', function () {
            myMap.filterCtrl('followers', this.value);
        });

        $('.college-select').on('change', function () {
            myMap.filterCtrl('college', this.value);
        });

        $('.from-select').on('change', function () {
            myMap.filterCtrl('from', this.value);
        });
    }
}(jQuery));
(function($) {


    if ($('#map-realestate').length > 0) {
        var myMap = function() {

            var	options = {
                zoom: 4,
                center: new google.maps.LatLng(38.810821,-95.053711),
                //mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles:
                    [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#448aff"},{"visibility":"on"}]}]
            }

            /*
             Load the map then markers
             @param object settings (configuration options for map)
             @return undefined
             */
            function init(settings) {
                map = new google.maps.Map(document.getElementById( settings.idSelector ), options);
                markerLocation = settings.markerLocation;
                loadMarkers();
            }

            /*
             =======
             MARKERS
             =======
             */
            markers = {};
            markerList = [];

            /*
             Load markers onto the Google Map from a provided array or demo personData (data.js)
             @param array personList [optional] (list of people to load)
             @return undefined
             */
            function loadMarkers(properties) {

                // optional argument of person
                var properties = ( typeof properties !== 'undefined' ) ? properties : propertiesData;

                var j = 1; // for lorempixel

                for( i=0; i < properties.length; i++ ) {
                    var property = properties[i];

                    // if its already on the map, dont put it there again
                    if( markerList.indexOf(property.id) !== -1 ) continue;

                    var lat = property.lat,
                        lng = property.lng,
                        markerId = property.id;

                    var infoWindow = new google.maps.InfoWindow({
                        maxWidth: 400
                    });

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng( lat, lng ),
                        title: property.name,
                        markerId: markerId,
                        icon: markerLocation,
                        map: map
                    });

                    markers[markerId] = marker;
                    markerList.push(property.id);



                    var popoverContent = ['<div class="map-box">'
                        , '<div><img src="'+ property.images[0] +'" width="200"/></div>',
                        '<div class="iw-text"><h5 class="margin-b-none">', property.title,
                        '</h5>Price: $', property.price, '</div></div>'].join('');

                    google.maps.event.addListener(marker, 'mouseover', (function (marker, popoverContent) {
                        return function() {
                            infoWindow.setContent(popoverContent);
                            infoWindow.open(map, marker);
                        }

                    })(marker, popoverContent));


                    // sidebar property items/images
                    var property_images = '';
                    $.each(property.images, function( index, value ) {
                        var item = '';
                        if (index == '0') {
                            item = '<div class="item active"><img src="'+ value +'" class="img-responsive"/>'+'</div>';
                        }
                        else {
                            item = '<div class="item"><img src="'+ value +'" class="="img-responsive"/>'+'</div>';
                        }
                        property_images = property_images  + '' + item;
                    });

                    // image slider
                    var slider = [
                            '<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">',
                            '<div class="carousel-inner">',
                                property_images,
                            '</div>',

                            '<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">',
                                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
                                '<span class="sr-only">Previous</span>',
                            '</a>',
                            '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">',
                            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
                            '<span class="sr-only">Next</span>',
                            '</a>',
                        '</div>'].join('');


                    var propertyPage = [
                        '<div class="sidebar-padding">',
                            '<h4 class="margin-none">'+property.title+'</h4>',
                            '<p class="text-muted">'+ property.address +' - ' + property.city +' - '+ property.state +'</p>',
                            '<p>',
                                '<span class="label label-primary">'+property.type+'</span> ' ,
                                '<span class="label label-primary">'+property.bedrooms+'</span> ' ,
                                '<span class="label label-primary">'+property.bathrooms+'</span>' ,
                            '</p>',
                            '<div class="property-images">',
                                slider,
                            '</div>',
                            '<strong class="text-muted margin-none">Property Description</strong>',
                            '<p>'+ property.description +'</p>',
                            '<strong class="text-muted margin-none">Price:</span>',
                            '<h4 class="margin-none text-primary">&euro;'+ property.price+'</h4>',
                        '</div>'].join('');

                    google.maps.event.addListener(marker, 'click', (function (marker, propertyPage) {

                        return function() {
                            $('body #propertySidebar').trigger('click');
                            $('body #map-property .wrapper').html(propertyPage);
                        }
                    })(marker, propertyPage));

                }
            }

            /*
             Remove marker from map and our list of current markers
             @param int id (id of the marker element)
             @return undefined
             */
            function removePropertyMarker(id) {
                if( markers[id] ) {
                    markers[id].setMap(null);
                    loc = markerList.indexOf(id);
                    if (loc > -1) markerList.splice(loc, 1);
                    delete markers[id];
                }
            }

            /*
             ======
             FILTER
             ======
             */

            // default all filters off
            var filter = {
                price: 0,
                type: 0,
                state: 0
            }

            var filterMap;

            /*
             Helper function
             @param array a (array of arrays)
             @return array (common elements from all arrays)
             */
            function reduceArray(a) {
                r = a.shift().reduce(function(res, v) {
                    if (res.indexOf(v) === -1 && a.every(function(a) {
                            return a.indexOf(v) !== -1;
                        })) res.push(v);
                    return res;
                }, []);
                return r;
            }

            /*
             Helper function
             @param string n
             @return bool
             */
            function isInt(n) {
                return n % 1 === 0;
            }


            /*
             Decides which filter function to call and stacks all filters together
             @param string filterType (the property that will be filtered upon)
             @param string value (selected filter value)
             @return undefined
             */
            function filterCtrl(filterType, value) {
                // result array
                var results = [];

                //console.log(filterType, filter);
                if( isInt(value) ) {
                    filter[filterType] = parseInt(value);
                } else {
                    filter[filterType] = value;
                }


                for( k in filter ) {


                    if( !filter.hasOwnProperty(k) && !( filter[k] !== 0 ) ) {
                        // all the filters are off
                        loadMarkers();
                        return false;
                    } else if ( filter[k] !== 0 ) {
                        // call filterMap function and append to r array
                        results.push( filterMap[k]( filter[k] ) );

                    } else {
                        // fail silently
                    }
                }
                if( filter[filterType] === 0 ) results.push( propertiesData );


                /*
                 if there is 1 array (1 filter applied) set it,
                 else find markers that are common to every results array (pass every filter)
                 */
                if( results.length === 1 ) {
                    results = results[0];
                } else {
                    results = reduceArray( results );
                }

                //console.log(results.length);
                // CLOSE SIDEBAR FILTER
                // remove all push-to classes from body
                $('body').removeClass (function (index, css) {
                    return (css.match (/\S+\b-push-to\S+/g) || []).join(' ');
                });
                closeSidebar();


                loadMarkers( results );

            }

            /*
             The keys in this need to be mapped 1-to-1 with the keys in the filter variable.
             */
            filterMap = {
                price: function( value ) {
                    return filterIntsLessThan('price', value);
                },

                type: function( value ) {
                    return filterByString('type', value);
                },

                state: function( value ) {
                    return filterByString('state', value);
                }
            }

            /*
             Filters marker data based upon a string match
             @param string dataProperty (the key that will be filtered upon)
             @param string value (selected filter value)
             @return array (properties that made it through the filter)
             */
            function filterByString( dataProperty, value ) {
                var properties = [];

                for( var i=0; i < propertiesData.length; i++ ) {
                    var property = propertiesData[i];
                    if( property[dataProperty] == value ) {
                        properties.push( property );
                    } else {
                        removePropertyMarker( property.id );
                    }
                }
                return properties;
            }

            /*
             Filters out integers that are under the provided value
             @param string dataProperty (the key that will be filtered upon)
             @param int value (selected filter value)
             @return array (people that made it through the filter)
             */
            function filterIntsLessThan( dataProperty, value ) {
                var properties = [], propertyCount = 0;

                for( var i=0; i < propertiesData.length; i++ ) {
                    //console.log(propertiesData[i]);
                    var property = propertiesData[i];

                    var propertyPrice = parseFloat(property[dataProperty ].replace(',',''));

                    value = parseFloat(value);

                    if( propertyPrice < value ) {
                        propertyCount = propertyCount + 1;
                        properties.push( property )
                    } else {
                        removePropertyMarker( property.id );
                    }
                }
                return properties;
            }

            // Takes all the filters off
            function resetFilter() {
                filter = {
                    price: 0,
                    type: 0,
                    state: 0
                }
            }

            return {
                init: init,
                loadMarkers: loadMarkers,
                filterCtrl: filterCtrl,
                resetFilter: resetFilter
            };
        }();
    }


    if ($('#map-realestate').length > 0) {
        var mapConfig = {
            idSelector: 'map-realestate',
            markerLocation: 'images/marker-house.png'
        }
        myMap.init(mapConfig);

        $('#load-btn').on('click', function () {
            $(this).closest('form').trigger("reset");
            var $this = $(this);
            // reset everything
            $('select').val(0);
            myMap.resetFilter();
            myMap.loadMarkers();

            if ($this.hasClass('is-success')) {
                $this.removeClass('is-success').addClass('is-default');
            }
        });


        $('.pricerange').on('change', function () {
            myMap.filterCtrl('price', this.value);
        });

        $('.type').on('change', function () {
            myMap.filterCtrl('type', this.value);
        });

        $('.state').on('change', function () {
            myMap.filterCtrl('state', this.value);
        });


    }

}(jQuery));

(function ($) {

    if ($('#graphWeek').length > 0) {
        new Morris.Bar({
            element: 'graphWeek',
            data: [
                {y: 'Monday', a: '3129'},
                {y: 'Tuesday', a: '4872'},
                {y: 'Wednesday', a: '7746'},
                {y: 'Thursday', a: '6398'},
                {y: 'Friday', a: '2299'},
                {y: 'Saturday', a: '992'},
                {y: 'Sunday', a: '3111'}
            ],
            xkey: 'y',
            ykeys: 'a',
            labels: '',
            barSizeRatio: 0.6,
            grid: false,
            hideHover: true,
            barColors: function (row, series, type) {
                if (row.label == "Monday") return "#448aff";
                else if (row.label == "Tuesday") return "#f2522b";
                else if (row.label == "Wednesday") return "#448aff";
                else if (row.label == "Thursday") return "#f2522b";
                else if (row.label == "Friday") return "#448aff";
                else if (row.label == "Saturday") return "#f2522b";
                else if (row.label == "Sunday") return "#448aff";
            },
            hoverCallback: function (index, options, content, object) {

                $('#graphWeek-y').text(object.y);
                $('#graphWeek-a').text('$' + object.a);
            }
        });
    }

    if ($('#graphWeek2').length > 0) {
        new Morris.Bar({
            element: 'graphWeek2',
            data: [
                {y: 'Monday', a: '3129'},
                {y: 'Tuesday', a: '4872'},
                {y: 'Wednesday', a: '7746'},
                {y: 'Thursday', a: '6398'},
                {y: 'Friday', a: '2299'},
                {y: 'Saturday', a: '992'},
                {y: 'Sunday', a: '3111'}
            ],
            xkey: 'y',
            ykeys: 'a',
            labels: '',
            barSizeRatio: 0.6,
            grid: false,
            hideHover: true,
            barColors: function (row, series, type) {
                return "#ccc";
            },
            hoverCallback: function (index, options, content, object) {

                $('#graphWeek2-y').text(object.y);
                $('#graphWeek2-a').text('$' + object.a);
            }
        });
    }

    if ($('#graphWeek3').length > 0) {
        new Morris.Bar({
            element: 'graphWeek3',
            data: [
                {y: 'Monday', a: '3129'},
                {y: 'Tuesday', a: '4872'},
                {y: 'Wednesday', a: '7746'},
                {y: 'Thursday', a: '6398'},
                {y: 'Friday', a: '2299'},
                {y: 'Saturday', a: '992'},
                {y: 'Sunday', a: '3111'}
            ],
            xkey: 'y',
            ykeys: 'a',
            labels: '',
            barSizeRatio: 0.6,
            grid: false,
            hideHover: true,
            barColors: function (row, series, type) {
                return "#fff";
            },
            hoverCallback: function (index, options, content, object) {

                $('#graphWeek3-y').text(object.y);
                $('#graphWeek3-a').text('$' + object.a);
            }
        });
    }


    if ($('#line-example').length > 0) {
        /*
         * Play with this code and it'll update in the panel opposite.
         *
         * Why not try some of the options above?
         */
        new Morris.Line({
            element: 'line-example',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            lineColors: ['#448aff', '#f2522b']
        });
    }

    if ($('#area-example').length > 0) {
        /*
         * Play with this code and it'll update in the panel opposite.
         *
         * Why not try some of the options above?
         */
        Morris.Area({
            element: 'area-example',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            lineColors: ['#448aff', '#f2522b']
        });
    }
}(jQuery));
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

(function ($) {

    var showLeftPush = document.getElementById('showLeftPush'),
        showRightPush = document.getElementById('showRightPush'),
        showUserPush = document.getElementById('showUserPush'),
        menuRight = document.getElementById( 'sidebar-right' ),
        menuLeft = document.getElementById( 'sidebar-left' ),
        body = document.body;

    // Left Sidebar
    if (showLeftPush !== null) {
        showLeftPush.onclick = function () {
            closeSidebar('sidebar-left');

            // some sidebars don't need an overlay (ex. chat) and we need to remove body hanging class
            $('body').removeClass('no-overlay');

            classie.toggle(this, 'active');
            classie.toggle(body, 'sidebar-push-toright');
            classie.toggle(menuLeft, 'sidebar-left-open');
        };
    }

    // Right Sidebar (Toggle Right Button) (Mobile)
    if (showRightPush !== null) {
        showRightPush.onclick = function () {
            //disableOther();

            if ($(".sidebar-right-open").length > 0 && $('.sidebar-right-open').attr('id') != 'sidebar-right') {
                // other right sidebar is open keep overlay
                $('body').addClass('sidebar-push-toleft');
            }
            else {
                classie.toggle(body, 'sidebar-push-toleft');
            }

            classie.toggle(this, 'active');
            closeSidebar('sidebar-right');

            // some sidebars don't need an overlay (ex. chat) and we need to remove body hanging class
            $('body').removeClass('no-overlay');

            classie.toggle(menuRight, 'sidebar-right-open');
        };
    }
    // Right Sidebar (User Photo) (Desktop)
    if (showUserPush) {
        showUserPush.onclick = function () {

            if ($(".sidebar-right-open").length > 0 && $('.sidebar-right-open').attr('id') != 'sidebar-right') {
                // other right sidebar is open keep overlay
                $('body').addClass('sidebar-push-toleft');
            }
            else {
                classie.toggle(body, 'sidebar-push-toleft');
                console.log('normal');
            }

            closeSidebar('sidebar-right');

            // some sidebars don't need an overlay (ex. chat) and we need to remove body hanging class
            $('body').removeClass('no-overlay');

            classie.toggle(this, 'active');
            classie.toggle(menuRight, 'sidebar-right-open');
        };
    }


}(jQuery));



function closeSidebar(exceptId) {
    // close all open sidebars
    $(".sidebar:not(#"+exceptId+")").removeClass(function (index, css) {
        return (css.match(/\S+\b-open/g) || []).join(' ');
    });

}

$('body .overlay-disabled').on('click', function () {
    // remove all push-to classes from body
    $('body').removeClass (function (index, css) {
        return (css.match (/\S+\b-push-to\S+/g) || []).join(' ');
    });
    closeSidebar();
});

(function ($) {

    if ($('#chat').length > 0) {

        var chat = document.getElementById('chat'),
            chatMessage = document.getElementById('chatMessage'),
            body = document.body;


        $('#chatMessages').on('click', function () {
            // Right Sidebar (Toggle Right Button) (Mobile)
            if ($(".sidebar-right-open").length > 0 && $('.sidebar-right-open').attr('id') != 'chat') {
                // other right sidebar is open keep overlay
                $('body').addClass('sidebar-push-toleft');
            }
            else {
                classie.toggle(body, 'sidebar-push-toleft');
                //classie.addClass(body, 'no-overlay');
            }

            closeSidebar('sidebar-right');
            classie.toggle(chat, 'sidebar-right-open');
        });
        // open message sidebar
        $('#chat ul li').on('click' , function () {

            classie.toggle(chatMessage, 'sidebar-right-open');

        });


        $('#chatMessage [data-toggle="close"]').on('click', function () {
            // remove all push-to classes from body
            classie.toggle(chatMessage, 'sidebar-right-open');
        });


    }

}(jQuery));
(function ($) {

    if ($('#map-filter').length > 0) {

        var filter = document.getElementById('map-filter'),
            propertySidebar = document.getElementById('map-property'),
            body = document.body;

        $('#filterSidebar').on('click', function () {
            // Right Sidebar (Toggle Right Button) (Mobile)
            if ($(".sidebar-right-open").length > 0 && $('.sidebar-right-open').attr('id') != 'map-filter') {
                // other right sidebar is open keep overlay
                $('body').addClass('sidebar-push-toleft');
            }
            else {
                classie.toggle(body, 'sidebar-push-toleft');
                //classie.addClass(body, 'no-overlay');
            }

            closeSidebar('sidebar-right');
            classie.toggle(filter, 'sidebar-right-open');
        });


        $('#map-filter [data-toggle="close"]').on('click', function () {
            // remove all push-to classes from body
            $('body').removeClass (function (index, css) {
                return (css.match (/\S+\b-push-to\S+/g) || []).join(' ');
            });
            closeSidebar();
        });


        // open message sidebar
        $('#propertySidebar').on('click' , function () {
            // Right Sidebar (Toggle Right Button) (Mobile)
            if ($(".sidebar-right-open").length > 0 && $('.sidebar-right-open').attr('id') != 'propertySidebar') {
                // other right sidebar is open keep overlay
                $('body').addClass('sidebar-push-toleft');
            }
            else {
                classie.toggle(body, 'sidebar-push-toleft');
                //classie.addClass(body, 'no-overlay');
            }

            closeSidebar('sidebar-right');
            classie.toggle(propertySidebar, 'sidebar-right-open');

        });



    }

}(jQuery));
(function ($) {

    // if scroll offset is required
    $('.sidebar .nicescroll .wrapper').niceScroll({scrollspeed: 26, cursorcolor:"#429eee", cursorborder: 0, horizrailenabled: false, railoffset: {left:-1}});

    // Disable Scroll when the mouse is over the sidebar
    $('.sidebar')
        .mouseover(function() {
            $('html').css('overflow','hidden');
        })
        .mouseout(function() {
            $('html').removeAttr('style');
    });

    // collapse
    $(".nav-sidebar .submenu > a").on('click', function (evt) {

        evt.preventDefault();


        var parent = $(this).closest('.sidebar');
        var submenuOpen = parent.find('.submenu .in');

        // Close Parent Open Submenus
        submenuOpen.collapse('hide');

        // Show Current Submenu
        $(this).next('ul').show().collapse('show');


        // display:none All Previously Opene Submenus
        submenuOpen.hide();

        // Toggle Open Classes
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        }

        parent.find('a.open').removeClass('open');
        $(this).addClass('open');


    });

    // nicescroll resize without debounce delay on collapse
    $('sidebar').find('.collapse').on('shown.bs.collapse', function () {
        $(".sidebar").getNiceScroll().show().onResize();
    });


    $('.sidebar [data-toggle="close"]').on('click', function () {
        // remove all push-to classes from body
        $('body').removeClass (function (index, css) {
            return (css.match (/\S+\b-push-to\S+/g) || []).join(' ');
        });
        closeSidebar();
    });


}(jQuery));
(function ($) {

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.bootstrapSlider != 'undefined') {

            this.bootstrapSlider();

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {


        if (! this.length) return;

        if (typeof $.fn.bootstrapSlider != 'undefined') {

            this.bootstrapSlider({

                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });


        }

    };


    $('[data-slider="default"]').tkSlider();
    $('[data-slider="formatter"]').tkSliderFormatter();


})(jQuery);
/* This is a prototype */
var position = 'bottom-left';
var background = 'bg-default';

var createSnackbar = (function() {
    // Any snackbar that is already shown
    var previous = null;

    return function(message, actionText, action) {
        if (previous) {
            previous.dismiss();
        }
        var snackbar = document.createElement('div');
        snackbar.className = 'snack';
        snackbar.className = snackbar.className + ' ' + position + ' ' + background;

        snackbar.dismiss = function() {
            this.style.opacity = 0;
        };
        var text = document.createTextNode(message);
        snackbar.appendChild(text);
        if (actionText) {
            if (!action) {
                action = snackbar.dismiss.bind(snackbar);
            }
            var actionButton = document.createElement('button');
            actionButton.className = 'action';
            actionButton.innerHTML = actionText;
            actionButton.addEventListener('click', action);
            snackbar.appendChild(actionButton);
        }
        setTimeout(function() {
            if (previous === this) {
                previous.dismiss();
            }
        }.bind(snackbar), 5000);

        snackbar.addEventListener('transitionend', function(event, elapsed) {
            if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                this.parentElement.removeChild(this);
                if (previous === this) {
                    previous = null;
                }
            }
        }.bind(snackbar));



        previous = snackbar;
        document.body.appendChild(snackbar);
        // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
        if (position == 'bottom-left' || position == 'bottom-right') {
            getComputedStyle(snackbar).bottom;
            snackbar.style.bottom = '0px';
        }
        if (position == 'top-left' || position == 'top-right') {
            getComputedStyle(snackbar).top;
            snackbar.style.top = '0px';
        }
        snackbar.style.opacity = 1;
    };
})();

(function ($) {


    var longMessage = "This is a longer message that won't fit on one line. It is, inevitably, quite a boring thing. Hopefully it is still useful.";
    var shortMessage = 'Your message was sent';

    $('#single-snack').on('click', function() {
        position = $(this).data('position');
        createSnackbar(shortMessage);
    });

    $('#multi-snack').on('click', function() {
        if ($(this).data('position')) position = $(this).data('position');
        createSnackbar(longMessage);
    });

    $('#singleaction-snack').on('click', function() {
        if ($(this).data('position')) position = $(this).data('position');
        createSnackbar(shortMessage, 'Dismiss');
    });

    $('#multiaction-snack').on('click', function() {
        if ($(this).data('position')) position = $(this).data('position');
        createSnackbar(longMessage, 'Wot?', function() { alert('Moo!'); });
    });




    // trigger message when div id notification exists
    if ($('#notification').length > 0) {
        setTimeout(function() {
            var message = $('#notification').html();
            console.log(message);
            position = $('#notification').data('position');
            //console.log(position);
            createSnackbar(message, 'Dismiss');
        }, 3000);
    }

}(jQuery));
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSummernote = function () {

        if (! this.length) return;

        if (typeof $.fn.summernote != 'undefined') {

            this.summernote({
                height: 300
            });

        }

    };

    $(function () {
        $('.summernote').each(function () {
            $(this).tkSummernote();
        });
    });

})(jQuery);

(function ($){

    var eltPrimary = $('[data-role="tagsinput tag-primary"]');
    eltPrimary.tagsinput({
        tagClass: 'label label-primary'
    });

    var eltDefault = $('[data-role="tagsinput tag-default"]');
    eltDefault.tagsinput({
        tagClass: 'label label-default'
    });

    var eltDanger = $('[data-role="tagsinput tag-danger"]');
    eltDanger.tagsinput({
        tagClass: 'label label-danger'
    });

}(jQuery));
(function ($) {

    var tree_glyph_options = {
            map: {
                checkbox: "fa fa-square-o fa-fw",
                checkboxSelected: "fa fa-check-square fa-fw",
                checkboxUnknown: "fa fa-check-square fa-fw fa-muted",
                error: "fa fa-exclamation-triangle fa-fw",
                expanderClosed: "fa fa-caret-right fa-fw",
                expanderLazy: "fa fa-angle-right fa-fw",
                expanderOpen: "fa fa-caret-down fa-fw",
                doc: "fa fa-file-o fa-fw",
                noExpander: "",
                docOpen: "fa fa-file fa-fw",
                loading: "fa fa-refresh fa-spin fa-fw",
                folder: "fa fa-folder fa-fw",
                folderOpen: "fa fa-folder-open fa-fw"
            }
        },
        tree_dnd_options = {
            autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
                /** This function MUST be defined to enable dragging for the tree.
                 *  Return false to cancel dragging of node.
                 */
                return true;
            },
            dragEnter: function(node, data) {
                /** data.otherNode may be null for non-fancytree droppables.
                 *  Return false to disallow dropping on node. In this case
                 *  dragOver and dragLeave are not called.
                 *  Return 'over', 'before, or 'after' to force a hitMode.
                 *  Return ['before', 'after'] to restrict available hitModes.
                 *  Any other return value will calc the hitMode from the cursor position.
                 */
                // Prevent dropping a parent below another parent (only sort
                // nodes under the same parent)
                /*
                 if(node.parent !== data.otherNode.parent){
                 return false;
                 }
                 // Don't allow dropping *over* a node (would create a child)
                 return ["before", "after"];
                 */
                return true;
            },
            dragDrop: function(node, data) {
                /** This function MUST be defined to enable dropping of items on
                 *  the tree.
                 */
                data.otherNode.moveTo(node, data.hitMode);
            }
        };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
(function ($){

        if ($('#world-map-gdp').length > 0) {
            var data = unemployment[ 0 ];
            var val = 2009;

            statesValues = jvm.values.apply({}, jvm.values(data.states)),
                metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
                metroUnemplValues = Array.prototype.concat.apply([], jvm.values(data.metro.unemployment));

            $('#world-map-gdp').vectorMap({
                map: 'us_aea_en',
                markers: data.metro.coords,
                backgroundColor: "none",
                markerStyle: {
                    initial: {
                        stroke: '#fff',
                        "stroke-width": 1.3,
                    },
                    hover: {
                        fill: "#424242",
                        stroke: 'transparent',
                        "stroke-width": 1.3,
                        cursor: 'pointer'
                    }
                },
                series: {
                    markers: [ {
                        attribute: 'fill',
                        scale: [ '#448aff' ],
                        values: data.metro.unemployment[ val ],
                        min: jvm.min(metroUnemplValues),
                        max: jvm.max(metroUnemplValues)
                    }, {
                        attribute: 'r',
                        scale: [ 5, 20 ],
                        values: data.metro.population[ val ],
                        min: jvm.min(metroPopValues),
                        max: jvm.max(metroPopValues)
                    } ],
                    regions: [ {
                        scale: [ '#dddddd', '#aaaaaa' ],
                        attribute: 'fill',
                        values: data.states[ val ],
                        min: jvm.min(statesValues),
                        max: jvm.max(statesValues)
                    } ]
                },
                onMarkerTipShow: function (event, label, index) {
                    label.html(
                        '<b>' + data.metro.names[ index ] + '</b><br/>' +
                        '<b>Population: </b>' + data.metro.population[ val ][ index ] + '</br>' +
                        '<b>Unemployment rate: </b>' + data.metro.unemployment[ val ][ index ] + '%'
                    );
                },
                onRegionTipShow: function (event, label, code) {
                    label.html(
                        '<b>' + label.html() + '</b></br>' +
                        '<b>Unemployment rate: </b>' + data.states[ val ][ code ] + '%'
                    );
                }
            });

            var map = $('#world-map-gdp').vectorMap('get', 'mapObject');

        }
}(jQuery));