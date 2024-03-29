import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, API_URL } from '../../config';
//const API_URL = "https://zizzamia.xyz"

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

    if (!isValid) {
        return new NextResponse("Message not valid", { status: 500 });
    }

    const text = message.input || '';
    let state = {
        page: 0
    };
    try {
        state = JSON.parse(decodeURIComponent(message.state?.serialized));
    } catch (e) {
        console.error(e);
    }

    /**
     * Use this code to redirect to a different page
     */
    /*
    if (message?.button === 3) {
      return NextResponse.redirect(
        'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
        { status: 302 },
      );
    }
    */

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: `👁️`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                }
                /*
                {
                  action: 'post_redirect',
                  label: 'Cute dog pictures',
                },*/
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/w3bbie${(state?.page % 2) + 1}.jpg`,
            },
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: new Date().toISOString(),
            }
        }),
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'auto';
