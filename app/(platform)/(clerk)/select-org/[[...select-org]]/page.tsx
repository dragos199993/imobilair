import { OrganizationList } from '@clerk/nextjs'
import { routes } from '@/constants/routes'

export default function Page() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  )
}
