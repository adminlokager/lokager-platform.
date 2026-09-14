#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================


## Logo asset replacement — current test scope
user_problem_statement: Use the supplied artwork exactly as provided, without redrawing/modifying it. Only replace logos, retain manual launch, 60-second countdown, layout, animations and other approved elements. Use one reusable component, responsive aspect-preserving sizing, and enable a later Canva SVG swap.
frontend:
  - task: Exact artwork replacement across all brand placements
    implemented: true
    working: NA
    file: frontend/src/components/brand/Logo.jsx
    needs_retesting: true
    status_history:
      - agent: main
        working: NA
        comment: Copied the supplied 2000x751 WebP byte-for-byte to public/brand/lokager-logo.webp. Logo.jsx is the only image renderer; sizes preserve former hero/countdown slot heights. Replaced header/launch/countdown/celebration/final and merge/identity scene art logos. The celebration now has the complete lockup above the unchanged live announcement, with the LOKAGER name as semantic heading text in its original-height slot, avoiding a second full logo. Removed unused programmatic marks/paths. Browser/social metadata references the same raw file. No image processing/cropping/colour filters; original background and margins retained.
test_plan:
  current_focus:
    - Byte-exact asset and all logo occurrences, no obsolete mark usages
    - Logo contained and centred at mobile/tablet/laptop/desktop sizes; no distortion or overlap
    - Full manual 60-second launch to celebration and final page; chime and scene transitions unchanged
    - No auto-start on either route or refresh; zero API requests; 404 header
agent_communication:
  - agent: main
    message: Latest iteration_4 overflow finding was already fixed after that report (documented in Technology Report section 15). Current change preserves original slot heights and grid so it should remain fixed. No auth exists; credentials not applicable. Test exact-asset hash bf39ce6e6e2c2f7e0991e04e422ce000367eb32013b03781064d01826afc6d4b and natural dimensions 2000x751. All Logo wrappers have testId + '-image' for their img. Source format is WebP, not SVG. No backend work or new integrations authorised.

## Logo asset replacement — verified
- Testing agent report: `/app/test_reports/iteration_5.json`; frontend 100%, no open action items or code edits by the testing agent.
- Exact SHA256/natural dimensions verified for supplied artwork; all seven placements load through the single Logo component.
- Desktop 1920x800 and 1366x768, tablet 820x1180, phones 390x844 and 360x780: centered logos, no horizontal overflow; laptop countdown scrollHeight=768 equals viewport.
- Full manual 60s countdown → zero hold → 9s celebration → Coming Soon verified, plus refresh/manual-start and 404 header/back-home flows; zero console errors and zero /api calls.
- No credentials needed or created; final Canva SVG and dedicated square favicon export remain future assets, not simulated.



## Full Module 0 regression — requested before completion
- User authorizes only confirmed bug fixes and performance/image-size optimisation, with NO redesign or new features.
- Expand iteration_5 to every 60→0 number, all 20 ordered 3-second scenes, double-tap, exact chime-at-zero, blocked/rejected audio, failed optional image, final-screen stability, stale/blocked browser storage, all public logo/favicon/meta assets, no backend dependency.
- Required viewports: 1920x1080, 1440x900, 1366x768, tablet, 430px mobile and 390px mobile. Verify no horizontal overflow, no text clipping, no load-induced layout shift and smartphone CPU/network performance.
- Main agent has not changed ceremony/audio/performance logic yet; reproduce issues first. Persist reproducible regression scripts and measurements. Full real-time ceremony after final fixes is mandatory.
