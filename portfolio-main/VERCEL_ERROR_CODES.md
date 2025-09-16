# Vercel Error Codes Reference

| Error Code | Meaning | Who Fixes? | How to Fix |
|-----------|---------|------------|------------|
| FUNCTION_INVOCATION_FAILED (500) | Function crashed | You | Check your API/serverless function code for errors, missing env vars, or bad imports. |
| FUNCTION_INVOCATION_TIMEOUT (504) | Function took too long | You | Optimize code, reduce external calls, or increase function timeout if possible. |
| FUNCTION_PAYLOAD_TOO_LARGE (413) | Request payload too big | You | Reduce request size, paginate data, or increase limits if possible. |
| FUNCTION_THROTTLED (503) | Too many invocations | You/Vercel | Reduce traffic, optimize function, or upgrade Vercel plan. |
| DEPLOYMENT_BLOCKED (403) | Permission issue | You | Check Vercel team/project permissions, billing, or GitHub access. |
| DEPLOYMENT_NOT_FOUND (404) | Invalid URL or deployment removed | You | Check deployment URL, redeploy, or verify project exists. |
| DEPLOYMENT_PAUSED (503) | Project paused/suspended | You/Vercel | Resume project in Vercel dashboard, check billing. |
| DNS_HOSTNAME_NOT_FOUND (502) | Hostname doesn’t exist | You | Check DNS settings, domain provider, and Vercel domain config. |
| DNS_HOSTNAME_RESOLVE_FAILED (502) | Failed to resolve domain | You | Fix DNS records, wait for propagation, or contact domain provider. |
| DNS_HOSTNAME_RESOLVED_PRIVATE (404) | Points to private IP | You | Use public IP for domain, check DNS config. |
| INVALID_IMAGE_OPTIMIZE_REQUEST (400) | Invalid image request | You | Check image URL, format, and optimization settings. |
| OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED (502) | External image fetch failed | You | Check image URL, server availability, or CORS settings. |
| OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS (502) | Redirect loop | You | Fix image URL, avoid redirect chains. |
| MIDDLEWARE_INVOCATION_FAILED (500) | Middleware crashed | You | Check middleware code for errors. |
| MIDDLEWARE_INVOCATION_TIMEOUT (504) | Middleware took too long | You | Optimize middleware code. |
| INFINITE_LOOP_DETECTED (508) | Code loops endlessly | You | Fix infinite loops in your code. |
| INVALID_REQUEST_METHOD (405) | Wrong HTTP method | You | Use correct HTTP method (GET, POST, etc.) |
| MALFORMED_REQUEST_HEADER (400) | Invalid HTTP headers | You | Fix request headers in client or server code. |
| REQUEST_HEADER_TOO_LARGE (431) | Oversized headers | You | Reduce header size. |
| URL_TOO_LONG (414) | Request URL exceeds limits | You | Shorten URL, use query params or POST body. |
| NOT_FOUND (404) | Resource not found | You | Check route, file, or API endpoint exists. |
| RESOURCE_NOT_FOUND (404) | Resource not found | You | Same as above. |
| ROUTER_CANNOT_MATCH (502) | No route matches | You | Check routing config, file names, and API endpoints. |
| INTERNAL_FUNCTION_INVOCATION_FAILED | Vercel internal error | Vercel | Wait and retry, contact Vercel support if persistent. |
| INTERNAL_CACHE_ERROR | Vercel cache system failed | Vercel | Wait and retry, contact Vercel support if persistent. |
| INTERNAL_DEPLOYMENT_FETCH_FAILED | Vercel platform couldn’t load deployment | Vercel | Wait and retry, contact Vercel support if persistent. |
| INTERNAL_MICROFRONTENDS_BUILD_ERROR | Vercel microfrontend system error | Vercel | Wait and retry, contact Vercel support if persistent. |
| INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED | Vercel image optimization error | Vercel | Wait and retry, contact Vercel support if persistent. |
| INTERNAL_UNEXPECTED_ERROR | Unknown Vercel error | Vercel | Wait and retry, contact Vercel support if persistent. |

---

**How to use this table:**
- If it’s in the “You” column, check your code, config, or deployment.
- If it’s in the “Vercel” column, it’s a platform issue — wait or contact Vercel support.
