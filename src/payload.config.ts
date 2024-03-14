import path from 'path'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import StoreAttributes from './collections/Store'
import InventoryAttributes from './collections/Inventory'
import Media from './collections/Media'
import ContentMedia from './collections/ContentMedia'
import ProductGroupAttributes from './collections/Products/ProductGroup'
import ProductCategoryAttributes from './collections/Products/ProductCategory'
import ProductAttributes from './collections/Products/Product'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    StoreAttributes,
    InventoryAttributes,
    Media,
    ContentMedia,
    ProductGroupAttributes,
    ProductCategoryAttributes,
    ProductAttributes
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
