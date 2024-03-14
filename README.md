To run the frontend :
### Step 1: Set Up Environment Variables
- Create a .env file in the root of the project and define the following variables:

```
VITE_API_BASE_URL=http://localhost:3333/
```
### Step 2
- `npm i`


### Step 3
- `npm run dev`

  
## WHY :

### Using React query 

I utilized TanStack Query (https://tanstack.com/query/latest) for handling API requests. It's remarkably powerful for fetching, caching, synchronizing, and updating state.

### Using Shadcn & tailwind

(https://ui.shadcn.com/docs). What's impressive about Shadcn is that it's  a collection of reusable components that seamlessly integrate into your applications. It is very helpful, especially for adding a dark mode feature.

### Using Zustand (state managment)

I utilized Zustand to establish a centralized source for managing authentication.

### Note :

I understand that storing tokens in local storage isn't the best solution due to security concerns. The preferred method is to keep refresh tokens in HTTP-only cookies, as they're safeguarded from XSS attacks because they can't be accessed via JavaScript. However, using local storage was a quick and easy temporary solution.

