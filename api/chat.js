// // api/chat.js

// const axios = require('axios');
// const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// module.exports = async (req, res) => {
//     // ✅ CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // ✅ Handle preflight
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST requests allowed' });
//   }

//   const { message, systemPrompt } = req.body;
//   const clientId = req.headers.origin || "unknown-site";

//   try {
//     const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
//       model: 'openai/gpt-3.5-turbo-0613',
//       messages: [
//         { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
//         { role: 'user', content: message }
//       ]
//     }, {
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const reply = response.data.choices[0].message.content;

//     await supabase.from('messages').insert([
//       { client_id: clientId, sender: 'user', message },
//       { client_id: clientId, sender: 'ai', message: reply }
//     ]);

//     res.status(200).json({ reply });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: 'AI service error' });
//   }
// };
// api/chat.js

// const axios = require('axios');
// const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const openrouterKey = process.env.OPENROUTER_API_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = async (req, res) => {
//   // ✅ CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // ✅ Handle preflight
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST requests allowed' });
//   }

//   const { message, systemPrompt } = req.body;
//   const clientId = req.headers.origin || "unknown-site";

//   try {
//     // ✅ Log incoming request
//     console.log("Incoming request body:", req.body);

//     // ✅ Check env variables
//     if (!openrouterKey) throw new Error("Missing OPENROUTER_API_KEY");
//     if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase credentials");

//     // ✅ Call OpenRouter
//     const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
//       model: 'openai/gpt-3.5-turbo-0613',
//       messages: [
//         { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
//         { role: 'user', content: message }
//       ]
//     }, {
//       headers: {
//         Authorization: `Bearer ${openrouterKey}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const reply = response.data.choices[0].message.content;

//     // ✅ Save both messages to Supabase
//     const { error: supabaseError } = await supabase.from('messages').insert([
//       { client_id: clientId, sender: 'user', message },
//       { client_id: clientId, sender: 'ai', message: reply }
//     ]);

//     if (supabaseError) {
//       console.error("Supabase insert error:", supabaseError);
//       throw new Error("Failed to insert messages into Supabase");
//     }

//     res.status(200).json({ reply });

//   } catch (error) {
//     console.error("Chat API error:", error.response?.data || error.message);
//     res.status(500).json({ error: 'AI service error' });
//   }
// };
// const axios = require('axios');
// const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const openrouterKey = process.env.OPENROUTER_API_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// module.exports = async (req, res) => {
//   // ✅ CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // ✅ Handle preflight request
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   // ✅ Reject non-POST requests
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST requests allowed' });
//   }

//   // ✅ Parse JSON body manually (required in Vercel functions)
//   if (!req.body || typeof req.body === 'string') {
//     try {
//       req.body = JSON.parse(req.body);
//     } catch (err) {
//       return res.status(400).json({ error: 'Invalid JSON in request body' });
//     }
//   }

//   const { message, systemPrompt } = req.body;
//   const clientId = req.headers.origin || "unknown-site";

//   // ✅ Validate inputs
//   if (!message) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   try {
//     // ✅ Check required environment variables
//     if (!openrouterKey) throw new Error("Missing OPENROUTER_API_KEY");
//     if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase credentials");

//     // ✅ Call OpenRouter API
//     const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
//       model: 'openai/gpt-3.5-turbo-0613',
//       messages: [
//         { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
//         { role: 'user', content: message }
//       ]
//     }, {
//       headers: {
//         Authorization: `Bearer ${openrouterKey}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const reply = response.data.choices[0].message.content;

//     // ✅ Insert messages into Supabase
//     const { error: supabaseError } = await supabase.from('messages').insert([
//       { client_id: clientId, sender: 'user', message },
//       { client_id: clientId, sender: 'ai', message: reply }
//     ]);

//     if (supabaseError) {
//       console.error("Supabase insert error:", supabaseError);
//       throw new Error("Failed to insert messages into Supabase");
//     }

//     return res.status(200).json({ reply });

//   } catch (error) {
//     console.error("Chat API error:", error.response?.data || error.message);
//     return res.status(500).json({ error: 'AI service error' });
//   }
// };
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// ✅ Load env variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

// ✅ Debug: Log environment variables (safely)
console.log("Environment Variables Status:", {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseKey: !!supabaseKey,
  hasOpenRouterKey: !!openrouterKey,
  openRouterKeyLength: openrouterKey ? openrouterKey.length : 0,
  openRouterKeyPrefix: openrouterKey ? openrouterKey.substring(0, 3) : 'none'
});

// ✅ Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ✅ Reject non-POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message, systemPrompt } = req.body;
  const clientId = req.headers.origin || "unknown-site";

  try {
    // ✅ Log incoming request
    console.log("Incoming request body:", req.body);

    // ✅ Check required keys with detailed error messages
    if (!openrouterKey) {
      console.error("Missing OPENROUTER_API_KEY environment variable");
      return res.status(500).json({ 
        error: 'API configuration error: Missing OpenRouter API key',
        details: 'Please check your Vercel environment variables'
      });
    }

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      return res.status(500).json({ 
        error: 'API configuration error: Missing Supabase credentials',
        details: 'Please check your Vercel environment variables'
      });
    }

    // ✅ Log the request we're about to make (safely)
    console.log("Making OpenRouter request with:", {
      model: 'openai/gpt-3.5-turbo-0613',
      hasAuthHeader: !!openrouterKey,
      authHeaderLength: openrouterKey ? openrouterKey.length : 0
    });

    // ✅ Send to OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo-0613',
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    // ✅ Insert into Supabase
    const { error: supabaseError } = await supabase.from('messages').insert([
      { client_id: clientId, sender: 'user', message },
      { client_id: clientId, sender: 'ai', message: reply }
    ]);

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      throw new Error("Failed to insert messages into Supabase");
    }

    // ✅ Send reply
    res.status(200).json({ reply });

  } catch (error) {
    // ✅ Full error log with detailed information
    console.error("Chat API error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      hasOpenRouterKey: !!openrouterKey,
      openRouterKeyLength: openrouterKey ? openrouterKey.length : 0
    });
    
    // Return more specific error messages
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Authentication failed. Please check your OpenRouter API key.',
        details: {
          message: error.response.data,
          keyStatus: {
            exists: !!openrouterKey,
            length: openrouterKey ? openrouterKey.length : 0,
            prefix: openrouterKey ? openrouterKey.substring(0, 3) : 'none'
          }
        }
      });
    }
    
    res.status(500).json({ 
      error: 'AI service error',
      details: error.response?.data || error.message
    });
  }
};
// api/chat.js

// const axios = require('axios');
// const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// module.exports = async (req, res) => {
//   // ✅ CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // ✅ Handle preflight
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Only POST requests allowed' });
//   }

//   const { message, systemPrompt } = req.body;
//   const clientId = req.headers.origin || "unknown-site";

//   try {
//     const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
//       model: 'openai/gpt-3.5-turbo-0613',
//       messages: [
//         { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
//         { role: 'user', content: message }
//       ]
//     }, {
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const reply = response.data.choices[0].message.content;

//     await supabase.from('messages').insert([
//       { client_id: clientId, sender: 'user', message },
//       { client_id: clientId, sender: 'ai', message: reply }
//     ]);

//     res.status(200).json({ reply });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: 'AI service error' });
//   }
// };
