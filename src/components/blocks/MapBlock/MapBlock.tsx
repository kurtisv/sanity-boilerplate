import React, { useMemo } from 'react'
import { MapPin, Navigation, Maximize2 } from 'lucide-react'

interface MapBlockProps {
  data: {
    title?: string
    description?: string
    address: string
    coordinates: {
      latitude: number
      longitude: number
    }
    zoomLevel: number
    mapStyle: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
    mapProvider: 'google' | 'mapbox'
    markers?: Array<{
      _key: string
      name: string
      description?: string
      coordinates: {
        latitude: number
        longitude: number
      }
      icon?: {
        asset: {
          url: string
        }
      }
      color?: string
    }>
    height: number
    showDirections?: boolean
    enableFullscreen?: boolean
    showMapControls?: boolean
  }
}

const MapBlock: React.FC<MapBlockProps> = ({ data }) => {
  const {
    title,
    description,
    address,
    coordinates,
    zoomLevel,
    mapStyle,
    mapProvider,
    markers = [],
    height,
    showDirections,
    enableFullscreen,
    showMapControls
  } = data

  // Construction de l'URL de la carte selon le fournisseur
  const mapUrl = useMemo(() => {
    const { latitude, longitude } = coordinates

    if (mapProvider === 'google') {
      const baseUrl = 'https://maps.google.com/maps'
      const params = new URLSearchParams({
        q: `${latitude},${longitude}`,
        z: zoomLevel.toString(),
        t: mapStyle === 'roadmap' ? 'm' : mapStyle === 'satellite' ? 'k' : mapStyle === 'hybrid' ? 'h' : 'p',
        output: 'embed'
      })

      // Ajout des marqueurs personnalisés
      if (markers.length > 0) {
        const markerParams = markers.map(marker => 
          `${marker.coordinates.latitude},${marker.coordinates.longitude}`
        ).join('|')
        params.append('markers', markerParams)
      }

      return `${baseUrl}?${params.toString()}`
    } else {
      // Mapbox
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'your-mapbox-token'
      const style = mapStyle === 'satellite' ? 'satellite-v9' : 
                   mapStyle === 'terrain' ? 'outdoors-v11' : 'streets-v11'
      
      return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${longitude},${latitude},${zoomLevel}/600x400?access_token=${accessToken}`
    }
  }, [coordinates, zoomLevel, mapStyle, mapProvider, markers])

  // URL pour les directions
  const directionsUrl = useMemo(() => {
    if (!showDirections) return null
    const { latitude, longitude } = coordinates
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  }, [coordinates, showDirections])

  const markersCount = markers?.length || 0

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* En-tête */}
      {(title || description) && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Informations de localisation */}
      <div className="p-4 bg-gray-50 border-b flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span className="font-medium">{address}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {markersCount > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {markersCount} marqueur{markersCount > 1 ? 's' : ''}
            </span>
          )}
          <span>Zoom: {zoomLevel}</span>
        </div>
      </div>

      {/* Carte */}
      <div className="relative">
        <iframe
          src={mapUrl}
          width="100%"
          height={height}
          style={{ border: 0, minHeight: '200px' }}
          allowFullScreen={enableFullscreen}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title || `Carte de ${address}`}
          className="w-full"
        />
        
        {/* Overlay avec contrôles si activés */}
        {showMapControls && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            {enableFullscreen && (
              <button
                onClick={() => window.open(mapUrl, '_blank')}
                className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                title="Ouvrir en plein écran"
              >
                <Maximize2 className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Marqueurs liste et actions */}
      <div className="p-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Liste des marqueurs */}
          {markersCount > 0 && (
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Points d'intérêt:</h3>
              <div className="flex flex-wrap gap-2">
                {markers.map((marker) => (
                  <div
                    key={marker._key}
                    className="inline-flex items-center space-x-1 bg-white px-3 py-1 rounded-full text-xs border"
                    style={{ borderColor: marker.color || '#3B82F6' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: marker.color || '#3B82F6' }}
                    />
                    <span className="font-medium">{marker.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            {showDirections && directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Navigation className="h-4 w-4" />
                <span>Directions</span>
              </a>
            )}
            
            <button
              onClick={() => navigator.clipboard.writeText(address)}
              className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              <span>Copier l'adresse</span>
            </button>
          </div>
        </div>

        {/* Coordonnées techniques */}
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
          Coordonnées: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)} 
          • Style: {mapStyle} • Fournisseur: {mapProvider === 'google' ? 'Google Maps' : 'Mapbox'}
        </div>
      </div>
    </div>
  )
}

export default MapBlock