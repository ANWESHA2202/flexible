import { g, auth, config } from '@grafbase/sdk';

//@ts-ignore
const User=g.model('User',{
  name: g.string().length({min: 2,max:25}),
  email: g.string().unique(),
  avatarUrl:g.url(),
  description:g.string(),
  githubUrl:g.url().optional(),
  linkedInUrl:g.url().optional(),
  projects:g.relation(()=>Project).list().optional()
}).auth((rules)=>{
  rules.public().read()
})
//@ts-ignore
const Project=g.model('Project',{
  title: g.string().length({min:3}),
  description:g.string(),
  image: g.url(),
  liveSiteUrl:g.url(),
  githubUrl:g.url(),
  category:g.string().search(),
  createdBy:g.relation(()=>User),
}).auth((rules)=>{
  rules.public().read(),
  rules.private().create().update().delete()
})

const jwt=auth.JWT({
  issuer: 'grafbase',
  secret: 'wb/50lQEGWH7q8RovHgKqrIu+wXV+YIB/R3HHC/u/4E=', //NEXTAUTH_SECRET
})
export default config({
  schema: g,
  auth:{
    providers:[jwt],
    rules:(rules)=>rules.private(),
  }
})