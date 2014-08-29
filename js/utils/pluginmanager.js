/* global define */
define(function(require){
	
	var logger = require('logger'),
		decorator = require('utils/decorator');
	
	var log = logger.get('pluginmanager');
	
	var module = {},
		current;
	
	module.create_plugin = function (name, title) {
		return {
			is_plugin: true,
			activate: function () {},
			deactivate: function () {},
			context: {},
			init: function () {},
			data: {},
			name: name,
			title: title,
			class: 'inactive'
		};
	};

	module.switch_to = decorator(function (plugin) {
		if (plugin === current) {
			return;
		}

		log.info('Switching to: ' + plugin.name);

		if (current) {
			current.deactivate();
		}
		current = plugin;
		
		current.activate();

		return current;
	});
	
	module.refresh = function() {
		if (current) {
			current.deactivate();
			current.activate();
		}
	};

	return module;
});