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
        
        console.log(this.year + '-' + this.month + '-' + this.day);
        
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
        
        // date rows
        for(var row = 0; row < 5; row++) {
            gridTable += '<tr>';
            for(var col = 0; col < 7; col++) {
                gridTable += '<td>31</td>';
            }
            gridTable += '</tr>';
        }
        
        gridTable += '</table>';
        return {
            html: gridTable,
            listeners: {
                scope: this,
                afterrender: this.initGridEvents
            }
        };
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
