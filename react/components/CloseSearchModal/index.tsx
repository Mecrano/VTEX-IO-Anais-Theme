import { useEffect } from 'react'
import { useDrawer } from 'vtex.store-drawer/DrawerContext'
import { useRuntime } from 'vtex.render-runtime'

const CloseSearchModal = () => {
  const { close } = useDrawer()
  const { route } = useRuntime()

  useEffect(() => {
    close()
  }, [route?.path])

  return null
}

export default CloseSearchModal
