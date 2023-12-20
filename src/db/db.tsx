const jsonData = `
{
  "boards": [
    {
      "name": "Platform Launch",
      "columns": [
        {
          "name": "Todo",
          "color": "#49C4E5",
          "tasks": [
            {
              "id": "taskid-1",
              "title": "Build UI for onboarding flow",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-1-1",
                  "title": "Sign up page",
                  "isCompleted": true
                },
                {
                  "id": "taskid-1-2",
                  "title": "Sign in page",
                  "isCompleted": false
                },
                {
                  "id": "taskid-1-3",
                  "title": "Welcome page",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-2",
              "title": "Build UI for search",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-2-1",
                  "title": "Search page",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-3",
              "title": "Build settings UI",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-3-1",
                  "title": "Account page",
                  "isCompleted": false
                },
                {
                  "id": "taskid-3-2",
                  "title": "Billing page",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-4",
              "title": "QA and test all major user journeys",
              "description": "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-4-1",
                  "title": "Internal testing",
                  "isCompleted": false
                },
                {
                  "id": "taskid-4-2",
                  "title": "External testing",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-1"
        },
        {
          "name": "Doing",
          "color": "#8471F2 ",
          "tasks": [
            {
              "id": "taskid-5",
              "title": "Design settings and search pages",
              "description": "",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-5-1",
                  "title": "Settings - Account page",
                  "isCompleted": true
                },
                {
                  "id": "taskid-5-2",
                  "title": "Settings - Billing page",
                  "isCompleted": true
                },
                {
                  "id": "taskid-5-3",
                  "title": "Search page",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-6",
              "title": "Add account management endpoints",
              "description": "",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-6-1",
                  "title": "Upgrade plan",
                  "isCompleted": true
                },
                {
                  "id": "taskid-6-2",
                  "title": "Cancel plan",
                  "isCompleted": true
                },
                {
                  "id": "taskid-6-3",
                  "title": "Update payment method",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-7",
              "title": "Design onboarding flow",
              "description": "",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-7-1",
                  "title": "Sign up page",
                  "isCompleted": true
                },
                {
                  "id": "taskid-7-2",
                  "title": "Sign in page",
                  "isCompleted": false
                },
                {
                  "id": "taskid-7-3",
                  "title": "Welcome page",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-8",
              "title": "Add search endpoints",
              "description": "",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-8-1",
                  "title": "Add search endpoint",
                  "isCompleted": true
                },
                {
                  "id": "taskid-8-2",
                  "title": "Define search filters",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-9",
              "title": "Add authentication endpoints",
              "description": "",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-9-1",
                  "title": "Define user model",
                  "isCompleted": true
                },
                {
                  "id": "taskid-9-2",
                  "title": "Add auth endpoints",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-10",
              "title": "Research pricing points of various competitors and trial different business models",
              "description": "We know what we're planning to build for version one. Now we need to finalize the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              "status": "Doing",
              "subtasks": [
                {
                  "id": "taskid-10-1",
                  "title": "Research competitor pricing and business models",
                  "isCompleted": true
                },
                {
                  "id": "taskid-10-2",
                  "title": "Outline a business model that works for our solution",
                  "isCompleted": false
                },
                {
                  "id": "taskid-10-3",
                  "title": "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-2"
        },
        {
          "name": "Done",
          "color": "#67E2AE",
          "tasks": [
            {
              "id": "taskid-11",
              "title": "Conduct 5 wireframe tests",
              "description": "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-11-1",
                  "title": "Complete 5 wireframe prototype tests",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-12",
              "title": "Create wireframe prototype",
              "description": "Create a greyscale clickable wireframe prototype to test our assumptions so far.",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-12-1",
                  "title": "Create clickable wireframe prototype in Balsamiq",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-13",
              "title": "Review results of usability tests and iterate",
              "description": "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-13-1",
                  "title": "Meet to review notes from previous tests and plan changes",
                  "isCompleted": true
                },
                {
                  "id": "taskid-13-2",
                  "title": "Make changes to paper prototypes",
                  "isCompleted": true
                },
                {
                  "id": "taskid-13-3",
                  "title": "Conduct 5 usability tests",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-14",
              "title": "Create paper prototypes and conduct 10 usability tests with potential customers",
              "description": "",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-14-1",
                  "title": "Create paper prototypes for version one",
                  "isCompleted": true
                },
                {
                  "id": "taskid-14-2",
                  "title": "Complete 10 usability tests",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-15",
              "title": "Market discovery",
              "description": "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-15-1",
                  "title": "Interview 10 prospective customers",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-16",
              "title": "Competitor analysis",
              "description": "",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-16-1",
                  "title": "Find direct and indirect competitors",
                  "isCompleted": true
                },
                {
                  "id": "taskid-16-2",
                  "title": "SWOT analysis for each competitor",
                  "isCompleted": true
                }
              ]
            },
            {
              "id": "taskid-17",
              "title": "Research the market",
              "description": "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
              "status": "Done",
              "subtasks": [
                {
                  "id": "taskid-17-1",
                  "title": "Write up research analysis",
                  "isCompleted": true
                },
                {
                  "id": "taskid-17-2",
                  "title": "Calculate TAM",
                  "isCompleted": true
                }
              ]
            }
          ],
          "id": "boardid-1-col-3"
        }
      ]
    },
    {
      "name": "Marketing Plan",
      "columns": [
        {
          "name": "Todo",
          "color": "#49C4E5",
          "tasks": [
            {
              "id": "taskid-18",
              "title": "Plan Product Hunt launch",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-18-1",
                  "title": "Find hunter",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-2",
                  "title": "Gather assets",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-3",
                  "title": "Draft product page",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-4",
                  "title": "Notify customers",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-5",
                  "title": "Notify network",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-6",
                  "title": "Launch!",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-19",
              "title": "Share on Show HN",
              "description": "",
              "status": "",
              "subtasks": [
                {
                  "id": "taskid-19-1",
                  "title": "Draft out HN post",
                  "isCompleted": false
                },
                {
                  "id": "taskid-19-2",
                  "title": "Get feedback and refine",
                  "isCompleted": false
                },
                {
                  "id": "taskid-19-3",
                  "title": "Publish post",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-20",
              "title": "Write launch article to publish on multiple channels",
              "description": "",
              "status": "",
              "subtasks": [
                {
                  "id": "taskid-20-1",
                  "title": "Write article",
                  "isCompleted": false
                },
                {
                  "id": "taskid-20-2",
                  "title": "Publish on LinkedIn",
                  "isCompleted": false
                },
                {
                  "id": "taskid-20-3",
                  "title": "Publish on Indie Hackers",
                  "isCompleted": false
                },
                {
                  "id": "taskid-20-4",
                  "title": "Publish on Medium",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-2-col-1"
        },
        {
          "name": "Doing",
          "color": "#8471F2 ",
          "tasks": [],
          "id": "boardid-2-col-2"
        },
        {
          "name": "Done",
          "color": "#67E2AE",
          "tasks": [],
          "id": "boardid-2-col-3"
        }
      ]
    },
    {
      "name": "Roadmap",
      "columns": [
        {
          "name": "Now",
          "color": "#49C4E5",
          "tasks": [
            {
              "id": "taskid-21",
              "title": "Launch version one",
              "description": "",
              "status": "",
              "subtasks": [
                {
                  "id": "taskid-21-1",
                  "title": "Launch privately to our waitlist",
                  "isCompleted": false
                },
                {
                  "id": "taskid-21-2",
                  "title": "Launch publicly on PH, HN, etc.",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-22",
              "title": "Review early feedback and plan next steps for roadmap",
              "description": "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              "status": "",
              "subtasks": [
                {
                  "id": "taskid-22-1",
                  "title": "Interview 10 customers",
                  "isCompleted": false
                },
                {
                  "id": "taskid-22-2",
                  "title": "Review common customer pain points and suggestions",
                  "isCompleted": false
                },
                {
                  "id": "taskid-22-3",
                  "title": "Outline next steps for our roadmap",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-3-col-1"
        },
        {
          "name": "Next",
          "color": "#8471F2 ",
          "tasks": [],
          "id": "boardid-3-col-2"
        },
        {
          "name": "Later",
          "color": "#67E2AE",
          "tasks": [],
          "id": "boardid-3-col-3"
        }
      ]
    }
  ]
}

`;

export const db = JSON.parse(jsonData);
