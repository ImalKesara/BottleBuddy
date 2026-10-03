PROJECT: BottleBuddy

BottleBuddy is a small AI-powered product discovery web application
for the Hacktoberfest Weekend Challenge 2026 — "Build for a Friend."

PURPOSE

BottleBuddy is being built for a friend who wants an easier way to
browse alcohol products based on budget and preferences.

Instead of manually configuring many filters, the user can describe
what they are looking for naturally.

Example:

"Beer under Rs. 5000, preferably lower strength"

BottleBuddy uses an open-weight AI model to understand the request
and convert it into structured product-search filters.

The AI does not generate product information.
Actual products, prices, brands, and ABV information come from the
product database.


TECH STACK

Application:
- SvelteKit
- TypeScript
- Tailwind CSS

AI:
- Gemma open-weight model
- Hosted AI inference

Database:
- MongoDB Atlas

Hosting:
- Render

Optional:
- Sentry for monitoring and AI tracing


CORE ARCHITECTURE

User
  ↓
BottleBuddy
  ↓
SvelteKit
  ↓
Natural-language request
  ↓
Hosted Gemma model
  ↓
Structured search filters
  ↓
MongoDB Atlas
  ↓
Matching products
  ↓
BottleBuddy results


AI RESPONSIBILITY

Gemma is responsible for understanding natural-language searches.

Example:

"Beer under Rs. 5000, preferably lower strength"

Gemma extracts information such as:

- Maximum budget
- Product category
- ABV preference
- Brand preference
- Sorting preference

Gemma does NOT:

- Invent products
- Invent prices
- Invent brands
- Invent ABV values
- Generate catalog information

BottleBuddy uses normal application logic to find products matching
the AI-generated filters.


OPEN-WEIGHT AI

Gemma is the core AI technology behind BottleBuddy.

BottleBuddy uses an open-weight model rather than making a closed
proprietary model the core of the application.

This provides:

- More control over model selection
- Ability to change models later
- Control over inference infrastructure
- Less dependence on a single proprietary AI provider
- Ability to customize model behavior


MAIN FEATURES

Natural-language search:
Users can describe what they want conversationally.

Manual filters:
- Maximum budget
- Product category
- Brand
- ABV range

Sorting:
- Price low to high
- Price high to low

Product results:
- Product image
- Name
- Brand
- Category
- Price
- ABV
- Why the product matched


FRIEND PREFERENCES

BottleBuddy can remember simple preferences for the friend.

Examples:

- Preferred category
- Typical budget
- Preferred ABV range

Preferences can remain in browser localStorage.

No account is required.

Explicit search requests should take priority over saved preferences.


DATABASE

MongoDB Atlas stores the product catalog.

Product information includes:

- Name
- Brand
- Category
- Price
- ABV
- Image
- Description

Sample/demo product data can be used while developing BottleBuddy.

Demo data should be clearly identified as sample data rather than
live market pricing.


HOSTING

BottleBuddy should be publicly accessible.

The friend and hackathon judges should be able to open a URL and use
the application without installing anything.

Render is the intended hosting platform.

The SvelteKit application and required backend services should be
hosted rather than depending on the developer's computer.


NO LOCAL AI REQUIREMENT

BottleBuddy does not require Ollama.

The production architecture should use hosted Gemma inference.

Users and judges should not need to:

- Install Ollama
- Download a model
- Run a local AI server
- Configure their computers

They should simply open BottleBuddy in their browser.


NOT PART OF BOTTLEBUDDY

BottleBuddy is a discovery tool, not an e-commerce platform.

It does NOT require:

- Authentication
- Login/signup
- User accounts
- Shopping cart
- Checkout
- Payments
- Orders
- Email verification
- Admin dashboard
- User management


USER EXPERIENCE

BottleBuddy should feel:

- Modern
- Simple
- Friendly
- Fast
- Responsive
- Mobile friendly

The AI search should be the main focus.

Manual filters should remain available.


RELIABILITY

If AI search temporarily fails, manual filtering should remain
available.

Invalid AI output should not crash BottleBuddy.

Database and network failures should have understandable error states.


PRIVACY

BottleBuddy does not require user accounts.

Simple friend preferences can remain in the browser rather than being
stored in the cloud.

Only information necessary to process an AI search should be sent to
the hosted inference service.


CHALLENGE CONNECTION

BottleBuddy is built for a real friend.

Open-weight AI is a core part of the application because Gemma
translates natural-language requests into structured product-search
filters.

Main challenge technologies:

- Gemma — open-weight AI model
- Render — hosting / AI infrastructure
- MongoDB Atlas — product database

Optional:

- Sentry — application monitoring and AI tracing


CORE EXPERIENCE

Friend types:

"Beer under Rs. 5000, preferably lower strength"

        ↓

Gemma interprets the request

        ↓

Structured filters

        ↓

BottleBuddy searches MongoDB

        ↓

Matching products

        ↓

BottleBuddy displays results


PROJECT PRIORITY

BottleBuddy should remain a small, polished hackathon project.

The priority is:

Natural language
      ↓
Gemma
      ↓
Filters
      ↓
MongoDB
      ↓
Useful results

Avoid unnecessary features or architecture that do not improve this
core experience.
