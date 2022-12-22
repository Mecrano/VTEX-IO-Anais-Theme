import React, { useMemo } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { flatten } from 'ramda'
import Image from 'vtex.store-image/Image'

import useFacetNavigation from './hooks/useFacetNavigation'
import { getSelectedCategories, newFacetPathName } from './utils'
import styles from './styles.css'

const BrandFilter = () => {
  const { filters, searchQuery } = useSearchPage()

  const facets = searchQuery?.data?.facets ?? {}

  const { brands, priceRanges, specificationFilters, categoriesTrees } = facets

  const newNamedFacet = (facet: any) => {
    return { ...facet, newQuerySegment: newFacetPathName(facet) }
  }

  const selectedFilters = useMemo(() => {
    const options = [
      ...specificationFilters.map((filter: any) => {
        return filter.facets.map((facet: any) => {
          return {
            ...newNamedFacet({ ...facet, title: filter.name }),
            hidden: filter.hidden,
          }
        })
      }),
      ...brands,
      ...priceRanges,
    ]

    return flatten(options)
  }, [brands, priceRanges, specificationFilters]).filter(
    (facet: any) => facet.selected
  )

  const selectedCategories = getSelectedCategories(categoriesTrees)

  const navigateToFacet = useFacetNavigation(
    useMemo(() => {
      return selectedCategories.concat(selectedFilters)
    }, [selectedFilters, selectedCategories]),
    'none'
  )

  return (
    <div className={`${styles.mainBrandContainer} flex items-center overflow-x-auto`}>
      {filters?.find(({ title }: any) => title === 'Marca')
        ?.facets?.slice(0,5)?.map((facet: any) => {
          return (
            <div
              className={`${styles.brandContainer} ${
                facet?.selected ? `${styles.brandContainerSelected} ` : ''
              }flex items-center justify-center`}
              onClick={() => navigateToFacet(facet, false)}
            >
              <Image
                src={`/arquivos/brand-${facet?.name?.toLowerCase()}.png`}
                alt={facet?.name}
                title={facet?.title}
              />
            </div>
          )
        })}
    </div>
  )
}

export default BrandFilter
