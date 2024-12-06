# Introduction

This file provides information on the results of the AI generated suggestions

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/1 https://github.com/cornshuckin2/etm-676-ai-qa/pull/2 https://github.com/cornshuckin2/etm-676-ai-qa/pull/3

Building code and tests, merged with no suggestions.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/4

- All suggested tests failed due to using the wrong locators.
  - Should we let AI read our file to avoid this?
- The suggestions on priority I agree with (Locked out user from P1 to P2).
- The suggestions on priority for the generated tests I agree with.

GIVEN SUMMARY BY AI
Overall, both tests passed, but additional tests targeting various user input scenarios are recommended, especially for invalid login attempts.
Timing is acceptable, with room for optimization on the login tests.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/5

- All suggested tests failed due to using the wrong locators.
- The suggestions were ok, but one test is not valid. Also, why didn't we get all of these suggestions on the first run?
- The suggestion on priority seemed a bit off. Error messages are important but not critical (P1).

Second Run

- It gave suggestions for new test cases, but those test cases already existed.
- Updating to a stronger model 4o-mini to 4o

GIVEN SUMMARY BY AI
Expand Test Coverage:

Implement additional test cases to cover missing scenarios such as attempting to log in without a username and with expired credentials. Use the provided TypeScript Playwright snippets as a template.
Maintain Efficient Execution:

Monitor test execution durations. While current timings are acceptable, strive for efficiency improvements for frequently executed tests.
Continuous Review:

Regularly review test results, focusing on high-priority tests, and adapt suite priorities as necessary to reflect user needs and system changes.
Automation Best Practices:

Follow automation best practices such as keeping tests isolated, reuse steps wherever possible, and ensure accurate tagging for better test management.
By following these recommendations, the testing suite can maintain high-quality coverage while ensuring efficient execution in alignment with development activities.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/6

- Attempted to upgrade the AI helpers, ended up closing the PR with no suggestions.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/7

- Implemented a few fixes from bad formatting, depdencies and node version. AI re-ran changed test suites.
- Gave a bit more redundant test cases that aren't valid for the product.

GIVEN SUMMARY BY AI
The current test suite for "Login scenarios" is well-covered overall, including important user authentication scenarios. There are opportunities to add tests for account-specific actions like locking after multiple failed logins and ensuring session invalidation after a logout, both of which are critical for security. Additionally, reviewing the timing of existing tests could uncover optimizations, especially in "can logout" and "valid session persists after page reload" which exhibit longer durations. Prioritization adjustments, especially involving account security, should be considered to ensure the most crucial aspects of user access are rigorously tested.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/8

- Missing test cases were not helpful, since it is an e2e
- It did mention that the test case was well put together and part of a crucial workflow

GIVEN SUMMARY BY AI
The existing test covers a crucial user flow: login, adding to a cart, and checkout, with a reasonable performance mark. To improve test coverage, consider adding tests for failure scenarios such as invalid login, and ensure edge cases like removing products from the cart are well-tested to avoid regressions. Expand on tagged priority tests to ensure critical paths are thoroughly vetted. Timing efficiency seems excellent, but ongoing monitoring is crucial for maintaining user satisfaction. Introducing additional edge test cases will ensure a robust and reliable user experience across various scenarios.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/9

No test results found, upgrading suggestor

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/10

GIVEN SUMMARY BY AI
Missing Test Cases: Include tests for session non-persistence after logout and login rate limiting.
Timing Optimizations: Address long test durations and investigate time-consuming steps.
Re-Prioritization: Increase priority for locked user login tests and enhance assertions across all tests.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/11

- Missing test cases did not provide any helpful insight
- It suggested p3, which I agree with as they are not critical
- Noted that login is taking long, which is a good suggestion for improvements

- The second request after making chnages told me to change it back to p2
- Made a good suggestion on removing duplication
- Inaccurately suggesting a test case for login for just filter tests

  GIVEN SUMMARY BY AI
  Missing Test Cases: A critical case for handling locked-out users is missing.
  Execution Timing Optimizations: Time taken for login steps is notably high, suggesting an optimization opportunity.
  Test Stability and Coverage: More rigorous testing scenarios to cover edge cases in product filtering and login functionality.
  Prioritization: Filter tests should be elevated in priority due to their integral role in user experience.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/12

- I left in some notes from a copy / paste error, Instead of calling out any problems it noted that the filter tests may be prone to defects when the test suite was for removing product from cart.
- AFter fixing the reqs, it gives suggestions on fixing test timing. But suggestions remain redundant

  GIVEN SUMMARY BY AI
  The main areas for improvement include:

Adding test cases for scenarios like empty cart removal and non-logged-in attempts.
Optimizing the login process due to its impact on execution time.
Reassessing priorities to allocate testing resources effectively.
Bolstering our test suite to cover potential flaky behaviors.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/13

- missing test cases provide value about thinking of what could be missing but does not give useful test code
- Upgrading from p3 to p2 was a good suggestion
- suggested to run tests in parallel. only 1 test was in the suite but still a good suggestion for larger suites

GIVEN SUMMARY BY AI
Introduced missing test cases for rendering and navigation via the burger menu to ensure comprehensive coverage.
Suggested re-prioritizing a critical navigation test from P3 to P2.
Recommended investigating steps with long timings to improve execution efficiency.
Highlighted the need for increased test coverage around core navigation to ensure robustness.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/14

- updated existing login suite. No useful suggestions given

GIVEN SUMMARY BY AI
Identified missing test cases, particularly for edge scenarios such as password resets and concurrent sessions.
Noted specific tests with extended execution timings, particularly the "can logout" and "valid session persists after reload", which require optimization.
Re-prioritized tests based on context impact.
Suggested additional coverage for areas prone to issues such as session management.

# https://github.com/cornshuckin2/etm-676-ai-qa/pull/15

- gave suggestion of test case I just wrote
- suggested to change for p1 but not needed

After second commit

- suggested a few test cases that could be useful, such as responsiveness and cart persistence

GIVEN SUMMARY BY AI
Missing Test Cases:

Add tests to verify functional outcomes such as cart content after application state resets.
Timing Optimizations:

Speed up login processing by switching to API-based authentication setup.
Analyze and resolve extended time for steps like closing the burger menu.
Stability Improvements:

Investigate long durations in seemingly simple operations to preemptively address flakiness.
