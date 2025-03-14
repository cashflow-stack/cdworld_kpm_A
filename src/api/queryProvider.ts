import { generateClient } from 'aws-amplify/api';

export const client = generateClient();


// New schema:

// import { generateClient } from 'aws-amplify/data';

// import type { Schema } from "@/data-schema";
// import type { SelectionSet } from 'aws-amplify/data';
// const newClient = generateClient<Schema>();