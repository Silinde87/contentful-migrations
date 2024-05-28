import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

const root = path.resolve(__dirname, '..');
const migrationsFolderPath = root + '/migrations';
const templatePath = migrationsFolderPath + '/_template.ts';

const _getMigrationInfo = async (): Promise<{
	description: string;
}> => {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'description',
			message: 'Which is the purpose of the migration? (e.g. add-title-to-teaser)',
			mask: '',
		},
	]);
	const description = answers.description.toLowerCase().replaceAll(' ', '-');

	return { description };
};

const _getLastVersion = (): number => {
	const files = fs.readdirSync(migrationsFolderPath);

	const versionNumbers = files.map((file) => {
		const match = file.match(/^(\d+)-/);
		return match ? parseInt(match[1], 10) : 0;
	});
	const lastVersion = Math.max(...versionNumbers);

	return lastVersion + 1;
};

const createMigration = async (): Promise<void> => {
	const lastVersion = _getLastVersion();
	const migration = await _getMigrationInfo();
	const migrationFileName = lastVersion + '-' + migration.description + '.ts';
	const migrationPath = migrationsFolderPath + '/' + migrationFileName;

	const templateFile = fs.readFileSync(templatePath);

	fs.writeFileSync(migrationPath, templateFile, 'utf8');
	console.info(`✅ Migration succesfully created.`);
};

(async () => {
	try {
		await createMigration();
		process.exit(0);
	} catch (e) {
		console.error(e);
		process.exit(-1);
	}
})();
