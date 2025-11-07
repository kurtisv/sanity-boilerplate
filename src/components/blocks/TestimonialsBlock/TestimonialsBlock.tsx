'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

interface TestimonialData {
  quote: string
  author: string
  position?: string
  company?: string
  photo?: {
    asset: {
      url: string
    }
    alt?: string
  }
  rating: number
  category?: string
  featured: boolean
}

interface TestimonialsBlockProps {
  data: {
    title?: string
    subtitle?: string
    layout: 'grid' | 'carousel' | 'list'
    showFilters: boolean
    categories?: Array<{ name: string; slug: string }>
    testimonials: TestimonialData[]
    showAllButton: boolean
    maxVisible: number
    backgroundColor?: string
  }
}

export default function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  const {
    title,
    subtitle,
    layout = 'grid',
    showFilters,
    categories = [],
    testimonials = [],
    showAllButton,
    maxVisible = 6,
    backgroundColor
  } = data || {}

  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)

  // Filter and sort testimonials
  const processedTestimonials = useMemo(() => {
    let filtered = testimonials.filter(testimonial =>
      activeFilter === 'all' || testimonial.category === activeFilter
    )

    // Sort featured testimonials first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    return filtered
  }, [testimonials, activeFilter])

  const visibleTestimonials = showAll 
    ? processedTestimonials 
    : processedTestimonials.slice(0, maxVisible)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  const TestimonialCard = ({ testimonial, featured = false }: { 
    testimonial: TestimonialData
    featured?: boolean 
  }) => (
    <div 
      className={`
        bg-white rounded-lg shadow-md p-6 h-full flex flex-col
        ${featured ? 'border-2 border-blue-500 relative' : ''}
        ${layout === 'list' ? 'flex-row items-center space-x-6' : ''}
      `}
    >
      {featured && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
          Featured
        </div>
      )}
      
      <div className={layout === 'list' ? 'flex-shrink-0' : 'mb-4'}>
        {testimonial.photo?.asset?.url && (
          <Image
            src={testimonial.photo.asset.url}
            alt={testimonial.photo.alt || testimonial.author}
            width={layout === 'list' ? 80 : 64}
            height={layout === 'list' ? 80 : 64}
            className="rounded-full object-cover"
          />
        )}
      </div>

      <div className={layout === 'list' ? 'flex-1' : ''}>
        <div className={layout === 'list' ? 'mb-2' : 'mb-4'}>
          {renderStars(testimonial.rating)}
        </div>

        <blockquote 
          className={`
            text-gray-700 mb-4 italic
            ${layout === 'list' ? 'text-sm' : ''}
          `}
        >
          "{testimonial.quote}"
        </blockquote>

        <div className="mt-auto">
          <div className="font-semibold text-gray-900">{testimonial.author}</div>
          {(testimonial.position || testimonial.company) && (
            <div className="text-sm text-gray-600">
              {testimonial.position}
              {testimonial.position && testimonial.company && ', '}
              {testimonial.company}
            </div>
          )}
          {testimonial.category && (
            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
              {testimonial.category}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (!testimonials.length) return null

  return (
    <section 
      className="py-16 px-4"
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Filters */}
        {showFilters && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveFilter(category.slug)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeFilter === category.slug
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Testimonials */}
        <div 
          className={`
            ${layout === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : layout === 'list'
              ? 'space-y-6'
              : 'flex overflow-x-auto gap-6 pb-4'
            }
          `}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={layout === 'carousel' ? 'flex-shrink-0 w-80' : ''}
            >
              <TestimonialCard 
                testimonial={testimonial} 
                featured={testimonial.featured}
              />
            </div>
          ))}
        </div>

        {/* Show All Button */}
        {showAllButton && processedTestimonials.length > maxVisible && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {showAll ? 'Show Less' : `View All ${processedTestimonials.length} Testimonials`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}