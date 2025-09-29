# **App Name**: LinkShrink

## Core Features:

- URL Submission: Accepts a long URL from the user via a web form.
- Short URL Generation: Generates a unique short URL based on a global, incrementing counter, encoded in base62.
- URL Redirection: Redirects users from the short URL to the original long URL using a temporary redirect (302 status code).
- Existing URL Check: Checks if the long URL has already been shortened, and if so, returns the existing short URL.
- Expiration Handling: Adds expiry time with URL. Default expiry is 30 days.
- Counter Management Tool: Manages the global counter using backend. Acts as a tool to decide whether to increment global counters when processing URL submissions.
- UI feedback: Simple UI alerts of errors such as a failed shrinking, failed redirection or an expired link.

## Style Guidelines:

- Primary color: Saturated blue (#4285F4) to convey trust and stability.
- Background color: Very light blue (#E3F2FD) to maintain a clean and professional look.
- Accent color: A vibrant, contrasting shade of purple (#9C27B0) to bring focus to calls to action.
- Body and headline font: 'Inter', a sans-serif font, offering a clean, modern, readable style across all devices.
- Use simple, clear icons from a library like FontAwesome to represent links and actions.
- A clean, single-page layout with a prominent input field for the URL and a clear display of the shortened URL.
- Subtle transitions and animations (e.g., a loading spinner) to provide feedback during the shortening process.