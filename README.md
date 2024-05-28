# Contentful Migrations

Manage and run Contentful Migrations

## How to use 

1. Fill the required environment variables.
2. Use ```npm run create-migration```to create a new versioned migration. This command will create an empty migration at ```migrations``` folder.
3. Once the migration is implemented, run the ```npm run migrate``` command.


## Useful Readings
- [Contentful Migration](https://github.com/contentful/contentful-migration). This is the library used to manage the data in Contentful
- [Contentful Migration Tool](https://github.com/marcomontalbano/contentful-migration-tool/tree/main). The tool used to execute the migrations
