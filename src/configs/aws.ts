import AWS from 'aws-sdk'
import { appConfigs } from '.'

AWS.config.update({
  region: appConfigs.aws.region,
  accessKeyId: appConfigs.aws.accessKeyId,
  secretAccessKey: appConfigs.aws.secretAccessKey
})
