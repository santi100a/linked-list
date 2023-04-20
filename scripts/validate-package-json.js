const json = require('../package.json');
if (!json.description) throw new Error('"description" required.');
if (!json.keywords || json.keywords.length < 1)
	throw new Error('"keywords" required.');
if (!json.repository) throw new Error('"description" required.');
