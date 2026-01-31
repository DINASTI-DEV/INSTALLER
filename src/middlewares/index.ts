import { useAuthorization } from './access'
import { allowAppRoles } from './appRole'
import { allowMembershipRoles } from './membershipRoleGuard'
import { requestTimer } from './requestTimer'

export const middleware = {
  useAuthorization,
  requestTimer,
  allowAppRoles,
  allowMembershipRoles
}
