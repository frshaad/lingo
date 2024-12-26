import db from '.';
import * as schema from './schema';

async function seed() {
  try {
    console.log('Seeding Database...');

    // Add a condition that will always evaluate to true to satisfy the linter
    await db.delete(schema.course);
    await db.delete(schema.lesson);
    await db.delete(schema.unit);
    await db.delete(schema.userProgress);
    await db.delete(schema.challenge);
    await db.delete(schema.challengeOption);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.course).values([
      { title: 'spanish', imageSrc: '/es.svg' },
      { title: 'german', imageSrc: '/de.svg' },
      { title: 'french', imageSrc: '/fr.svg' },
      { title: 'italian', imageSrc: '/it.svg' },
    ]);

    console.log('Seeding Finished!');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
}

seed();
