Ext.setup({
    onReady: function() {
        var cal = new Ext.ux.Calendar({});
        
        var mainPanel = new Ext.Panel({
            fullscreen: true,
            layout: 'fit',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                title: 'Ext.ux.Calendar'
            }],
            items: [cal]
        });
        mainPanel.show();
    }
});