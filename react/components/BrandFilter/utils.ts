import { zipObj } from 'ramda'

import {
  FILTER_TITLE_SEP,
  MAP_BRAND_CHAR,
  MAP_CATEGORY_CHAR,
  MAP_VALUES_SEP,
  PATH_SEPARATOR,
  SPACE_REPLACER,
  SPEC_FILTER,
} from './hooks/constants'

export const getSelectedCategories: any = (tree: any) => {
  for (const node of tree) {
    if (!node.selected) {
      continue
    }

    if (node.children) {
      return [node, ...getSelectedCategories(node.children)]
    }

    return [node]
  }

  return []
}

const from =
  'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'

const to =
  'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'

const removeAccents = (str: string) => {
  let newStr = str.slice(0)

  for (let i = 0; i < from.length; i++) {
    newStr = newStr.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return newStr
}

const searchSlugify = (str: string) => {
  // According to Bacelar, the search API uses a legacy method for slugifying strings.
  // replaces special characters with dashes, remove accents and lower cases everything
  // eslint-disable-next-line no-useless-escape
  const replaced = str.replace(/[*+~.()'"!:@&\[\]`,/ %$#?{}|><=_^]/g, '-')

  return removeAccents(replaced).toLowerCase()
}

export const newFacetPathName = (facet: any) => {
  if (facet.map?.includes(SPEC_FILTER)) {
    return `${searchSlugify(
      facet.title
    )}${FILTER_TITLE_SEP}${facet.value.replace(/\s/g, SPACE_REPLACER)}`
  }

  if (facet.map === MAP_CATEGORY_CHAR || facet.map === MAP_BRAND_CHAR) {
    return facet.value.toLowerCase()
  }

  return facet.value
}

export const getMainSearches = (query: any, map: any) => {
  const querySegments = query?.split(PATH_SEPARATOR) || []
  const mapSegments = map?.split(MAP_VALUES_SEP) || []
  const zip = zipObj(mapSegments, querySegments)

  return {
    ft: zip.ft,
    productClusterIds: zip.productClusterIds,
    seller: zip.seller,
  }
}
