import { ImageResponse } from 'next/og'
import { allBlogs } from 'contentlayer/generated'
import { siteConfig } from '@/config/site'
import { blogConfig } from '@/config/blog'
import { readFileSync } from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return allBlogs.flatMap((post) => {
    const parts = post.slugAsParams.split('/')
    // slugAsParams format: "locale/slug" e.g., "en/introducing-v2"
    const locale = parts[0]
    const slug = parts.slice(1)

    if (slug.length === 0 || !locale) return []

    return [
      { locale, slug }
    ]
  })
}

export async function GET(
  request: Request,
  props: { params: Promise<{ locale: string; slug: string[] }> }
) {
  const params = await props.params
  const { locale, slug } = params
  
  const slugString = Array.isArray(slug) ? slug.join('/') : slug
  const slugAsParams = `${locale}/${slugString}`
  const post = allBlogs.find((post) => post.slugAsParams === slugAsParams)

  if (!post) {
    return new Response('Not Found', { status: 404 })
  }

  // Resolve Author
  const authorId = post.author_id || post.author?.id
  const author = blogConfig.authors.find((a) => a.id === authorId) || blogConfig.authors[0] || {
    name: siteConfig.author.name,
    image: '/authors/daltonmenezes.jpg',
    id: 'default'
  }

  // Read Assets
  const fontPath = path.join(process.cwd(), 'public/fonts/Geist-Bold.ttf')
  const fontData = readFileSync(fontPath)

  const bgPath = path.join(process.cwd(), 'public/og-background.jpg')
  const bgData = readFileSync(bgPath)
  const bgSrc = `data:image/jpeg;base64,${bgData.toString('base64')}`

  const logoPath = path.join(process.cwd(), 'public/logo.svg')
  const logoData = readFileSync(logoPath)
  const logoSrc = `data:image/svg+xml;base64,${logoData.toString('base64')}`

  const authorImgPath = path.join(process.cwd(), 'public', author.image || '/authors/daltonmenezes.jpg')
  const authorImgData = readFileSync(authorImgPath)
  const authorSrc = `data:image/jpeg;base64,${authorImgData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#000',
        }}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '60px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Top: Logo & Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '40px',
              padding: '8px 20px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width="28" height="28" alt="Logo" />
            <div
              style={{
                fontSize: 20,
                color: '#e2e8f0',
                fontWeight: 600,
                letterSpacing: '0.2px',
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          {/* Center: Title */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingBottom: '20px',
            }}
          >
            <div
              style={{
                fontSize: 82,
                fontWeight: 900,
                textAlign: 'center',
                lineHeight: 1.1,
                maxWidth: '1000px',
                backgroundImage: 'linear-gradient(to right, hsl(47, 100%, 74%), hsl(176, 71%, 60%))',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-2px',
              }}
            >
              {post.title}
            </div>
          </div>

          {/* Bottom: Author */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={authorSrc}
              width="64"
              height="64"
              alt={author.name}
              style={{
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            />
            <div style={{ fontSize: 32, color: '#f1f5f9', fontWeight: 600 }}>
              {author.name}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}

