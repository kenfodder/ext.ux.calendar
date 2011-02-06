Ext.ns("Ext.ux");

Ext.ux.Calendar = Ext.extend(Ext.Panel, {
    year: null,
    month: null,
    day: null,
    
    layout: 'fit',
    cls: 'x-calendar',
    initComponent : function() {
        var now = new Date();
        if(Ext.isEmpty(this.year))
            this.year = now.getFullYear();
        if(Ext.isEmpty(this.month))
            this.month = now.getMonth();
        if(Ext.isEmpty(this.day))
            this.day = now.getDate();
        
        if (!Ext.isArray(this.items)) {
            this.items = [];
        }
        this.items.push(new Ext.Component(this.buildCalendarGrid()));
        Ext.ux.Calendar.superclass.initComponent.call(this);
    },
    
    buildCalendarGrid: function() {
        var gridTable = '';
        gridTable += '<table class="x-calendar-table">';
        
        // header row
        gridTable += '<thead><tr>';
        Ext.each(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'], function() {
            gridTable += '<th>' + this + '</th>';
        });
        gridTable += '</tr></thead>';
        
        var firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
        var lastDayOfMonth = this.daysInAMonth(this.year, this.month);
        var currentDay = 1;    
        var rows = [];
        for(var row = 0; row < 5; row++) {
            rows[row] = [];
            for(var col = 0; col < 7; col++) {
                // don't start till the first day of the month
                if(row == 0 && col < firstDayOfMonth) {
                    rows[row][col] = null;
                    continue;
                }
                // stop after the last day of the month
                if(currentDay > lastDayOfMonth) {
                    rows[row][col] = null;
                    continue;
                }
                rows[row][col] = currentDay;
                currentDay++;
            }
        }
        
        // date rows
        Ext.each(rows, function(item){
            gridTable += '<tr>';
            for(col = 0; col < 7; col++) {
                var num = '';
                var isToday = '';
                if(!Ext.isEmpty(item[col])) {
                    num = item[col];
                    
                    // add a class for the selected day
                    if(num == this.day)
                        isToday = 'x-calendar-selected';
                }
                gridTable += '<td class="' + isToday + '">' + num + '</td>';
            }
            gridTable += '</tr>';
        }, this);
        
        gridTable += '</table>';
        return {
            html: gridTable,
            listeners: {
                scope: this,
                afterrender: this.initGridEvents
            }
        };
    },
    
    daysInAMonth: function(year, month)  {
        var days;
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)  days = 31;
        else if (month == 3 || month == 5 || month == 8 || month == 10) days = 30;
        else if (month == 1)  {
            if (this.isLeapYear(year)) { days = 29; }
            else { days = 28; }
        }
        return days;
    },
    
    isLeapYear: function(year) {
        if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
            return true;
        } else { 
            return false; 
        }
    },
    
    initGridEvents: function(cmp) {
        var el = cmp.getEl();
        el.on("tap", this.handleGridEvent, this);
    },
    
    handleGridEvent: function(eve, ele) {
        console.log('Tapped');
    }    
});

Ext.reg("calendarpanel", Ext.ux.Calendar);
