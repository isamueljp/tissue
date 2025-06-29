
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { event_type, payment_id, amount, status, upi_transaction_id } = await req.json()
    
    console.log('Payment webhook received:', { 
      event_type, 
      payment_id, 
      amount, 
      status,
      upi_transaction_id 
    })

    // Handle different payment events
    switch (event_type) {
      case 'payment.success':
        // Update your database with successful payment
        console.log(`Payment ${payment_id} successful for amount ${amount}`)
        break
        
      case 'payment.failed':
        console.log(`Payment ${payment_id} failed`)
        break
        
      case 'payment.pending':
        console.log(`Payment ${payment_id} is pending`)
        break
        
      default:
        console.log(`Unknown event type: ${event_type}`)
    }

    return new Response(
      JSON.stringify({ message: 'Webhook received successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
