import {SetMetadata} from '@nestjs/common'

export const Permissions = (...args: string[]) => {
    return SetMetadata('permissions', args)
}
