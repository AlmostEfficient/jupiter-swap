// UNTESTED 
//Can use this to pay tx fees for users :)
import fetch from 'cross-fetch';

export async function POST(request: Request) {

  const { quoteResponse, userPublicKey, wrapAndUnwrapSol = true, feeAccount } = await request.json();

  console.log('Request to swap from', userPublicKey)
  
  try {
    const swapTxResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol,
        feeAccount,
      }),
    });

    if (!swapTxResponse.ok) {
      throw new Error(`HTTP error! status: ${swapTxResponse.status}`);
    }

    const swapTransaction = await swapTxResponse.json();
    return new Response(JSON.stringify(swapTransaction), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {

    return new Response(JSON.stringify({ message: 'Error fetching from Jupiter API', error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
