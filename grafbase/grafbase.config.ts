import { g, auth, config } from '@grafbase/sdk';

const User=g.model('User',{
  name: g.string().length({min: 2,max:25}),
  email: g.string().email().unique(),
  avatarUrl:g.url(),
  description:g.string(),
  githubUrl:g.url().optional(),
  likedInUrl:g.url().optional(),
  projects:g.relation(()=>Project).list().optional()
})
const Project=g.model('Project',{
  title: g.string().length({min:3}),
  description:g.string(),
  image: g.url(),
  liveSiteUrl:g.url(),
  githubUrl:g.url(),
  category:g.string().search(),
  createdBy:g.relation(()=>User)
})
export default config({
  schema: g
})