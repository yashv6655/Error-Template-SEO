import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { projectName, projectDescription, projectType } = await request.json()

    const prompt = `You are an expert in GitHub issue templates and developer experience. Generate 3 professional GitHub issue templates in YAML format for the following project:

**Project Name:** ${projectName}
**Description:** ${projectDescription}
**Type:** ${projectType}

Please generate these 3 templates:

1. **Bug Report Template** - Should include fields for bug description, reproduction steps, expected behavior, environment details, and be optimized for quick bug triage.

2. **Feature Request Template** - Should include fields for feature description, use case, proposed solution, alternatives considered, and encourage detailed feature specifications.

3. **Performance Issue Template** - Should include fields for performance issue description, current performance metrics, expected performance, system information, and profiling data.

**Requirements:**
- Use proper GitHub issue template YAML format
- Include SEO-friendly titles and descriptions
- Add relevant labels for each template type
- Include helpful placeholder text and validation
- Make templates professional and easy to use
- Optimize for developer productivity and issue quality

**IMPORTANT:** Return ONLY a valid JSON object with this exact structure:
{
  "bugTemplate": "YAML content here",
  "featureTemplate": "YAML content here", 
  "performanceTemplate": "YAML content here"
}

Do not include any markdown formatting, explanations, or additional text. Just the JSON object.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const responseContent = message.content[0]
    if (responseContent.type === 'text') {
      try {
        const templates = JSON.parse(responseContent.text)
        return NextResponse.json(templates)
      } catch (parseError) {
        console.error('Failed to parse Claude response:', parseError)
        return NextResponse.json(
          { error: 'Failed to parse AI response' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Invalid response from AI' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Error generating templates:', error)
    return NextResponse.json(
      { error: 'Failed to generate templates' },
      { status: 500 }
    )
  }
}