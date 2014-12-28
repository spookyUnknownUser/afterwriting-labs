/* global define */
define(function (require) {

	var pm = require('utils/pluginmanager'),
		logger = require('logger'),
		editor = require('plugins/editor'),
		data = require('modules/data'),
		queries = require('modules/queries');
	
	var log = logger.get('stats');
	var plugin = pm.create_plugin('stats', 'stats');

	plugin.goto = function (line) {
		editor.goto(line);
	};

	plugin.activate = function () {
		plugin.is_active = true;
		plugin.data.days_and_nights = queries.days_and_nights.run(data.parsed_stats.tokens);
		plugin.data.scenes = queries.scene_length.run(data.parsed_stats.tokens);
		var basics = queries.basics.run(data.parsed_stats.lines);
		plugin.data.who_with_who = queries.dialogue_breakdown.run(data.parsed_stats.tokens, basics, data.config.stats_who_with_who_max);
		plugin.data.page_balance = queries.page_balance.run(data.parsed_stats.lines);
		plugin.data.tempo = queries.tempo.run(data.parsed_stats.tokens);
		plugin.data.locations_breakdown = queries.locations_breakdown.run(data.parsed_stats.tokens);
	};

	plugin.deactivate = function () {
		plugin.is_active = false;
	};

	return plugin;
});