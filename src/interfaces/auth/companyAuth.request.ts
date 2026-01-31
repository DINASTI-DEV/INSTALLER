export interface ICompanyRegisterRequest {
  user: {
    userId: number
    userName: string
    userPassword: string
    userWhatsappNumber: string
    userRole: 'admin' | 'superAdmin' | 'user'
    userDeviceId: string
    onboardingStatus?: 'waiting' | 'done'
    userPositionId?: number
    userFaceId?: string
  }
  company: {
    companyId: number
    companyName: string
    companyIndustry: string
    companyInviteCode: string
  }
}

export interface ICompanyLoginRequest {
  userPassword: string
  userWhatsappNumber: string
}
