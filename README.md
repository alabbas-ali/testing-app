# Shop-Apotheke-App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project is a Frontend / Backend Code Challange. The project is to implement a small client application for discovering trending repositories on GitHub.
A list of the most popular repositories of the last week should be displayed and the user should be able to star them. The starred repositories should be visible either through a filter or in a diferent tab. Some basic info about the repo should be displayed, such as: repo name, link to GitHub, description and number of stars. 
To keep things simple, the starring won’t be sent back to GitHub’s servers but just stored in localStorage.

## Runing the application 

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) and try it .


## API 

Can be accessed on [http://localhost:3000/api/search](http://localhost:3000/api/search). This endpoint can be edited in `pages/api/search.js`.

The endpoint that provides 
 * A list of the most popular repositories, sorted by number of stars.
 * An option to be able to view the top 10, 50, 100 repositories should be available.
 * Given a date, the most popular repositories created from this date onwards should be returned.
 * A filter for the programming language would be a great addition to have.

The end point map the https://api.github.com/search/repositories read more about it https://docs.github.com/en/rest/reference/search


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
