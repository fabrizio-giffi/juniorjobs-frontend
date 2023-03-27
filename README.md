# Junior Jobs Frontend

## Description

Junior Jobs is an online platform designed to connect junior developers with companies that offer entry-level positions in the tech industry. The platform was created with the aim of bridging the gap between talented but inexperienced developers and employers seeking fresh talent.

On Junior Jobs, job seekers can create profiles that showcase their skills, education, and experience. Once their profiles are complete, they can browse through job listings and apply to any that match their skills and interests.
They can also message companies directly to learn more about their job offers or to plan a appointment.

For companies, Junior Jobs provides a streamlined process for finding and hiring junior developers. Employers can post job openings on the platform and browse through profiles of potential candidates. They can also message candidates directly to learn more about their skills and experience.

Overall, Junior Jobs is a valuable resource for both job seekers and employers in the tech industry. It helps to create more opportunities for junior developers and supports their career growth and success.

## Routes

| Route                     | Description            |
|---------------------------|------------------------|
| `/`                       | Homepage               | 
| `/jobs`                   | List with all jobs     |
| `/login`                  | Login form             | 
| `/signup`                 | Signup form            |         
| `/forgot-password/:role`  | Forgot password form   |         
| `/reset/:user/:token`     | Reset password form    |         
| `/profile`                | Private profile page   |         
| `/create-post`            | Create job post form   |         
| `/jobs/:id`               | Job post details       |         
| `/company/:id`            | Public company profile |          
| `/junior`                 | List with all juniors  |         
| `/junior/:id`             | Public junior profile  |         
| `*`                       | 404 error page         |         

## Pages

| Pages                  |
|------------------------|
| Homepage               | 
| Job list page          |
| Login page             | 
| Signup page            |         
| Forgot password page   |         
| Reset password page    |         
| Private profile page   |         
| Create job post page   |         
| Job post details page  |         
| Public company profile page |          
| Page with all juniors  |         
| Public junior profile page |         
| 404 error page         |     

## Components

- Companies
    - CompanyBio
    - CompanyProfile
    - CompanyProfilePublic
    - EditCompany
    - FavJuniors

- Filters
    - CompanyFilter
    - FieldFilter
    - GeoFilter

- Jobs
    - JobList
    - JobPostCard
    - JobPostCardForm
    - JobPostProfile

- Juniors
    - EditJunior
    - FavCompaniesProfile
    - JuniorBio
    - JuniorCard
    - JuniorCardPublic
    - JuniorList
    - JuniorProfile
    - SkillsProfile

- Middlewares
    - IsCompany
    - IsLoading
    - IsLoggedIn
    - IsLoggedOut

- Other
    - Footer
    - Navbar
    - PasswordForm

## External API

- [Countries Now](https://countriesnow.space/)
    - List of countries
    - List of cities from the specified country
- [Google Maps](https://developers.google.com/maps)
    - Show location on google maps of the company

## Libraries 

- Material UI
- Axios
- Cloudinary
- Dotenv
- React
- React-calendly
- React-dom
- React-router-dom
- Vite

## Links

- Github frontend
    - https://github.com/fabrizio-giffi/juniorjobs-frontend
- Github backend 
    - https://github.com/fabrizio-giffi/juniorjobs-backend
- Deployed version
    - https://juniorjobs-frontend.netlify.app/
