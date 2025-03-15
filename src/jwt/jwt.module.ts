import { Module, Global } from '@nestjs/common';
import { JwtModule as JwtRootModule, JwtSecretRequestType } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { configuration } from 'src/utils';

@Global()
@Module({
  imports: [
    JwtRootModule.registerAsync({
      useFactory: async () => {
        return {
          secretOrKeyProvider(type: JwtSecretRequestType) {
            switch (type) {
              case JwtSecretRequestType.SIGN:
                return readFileSync(configuration.jwtPrivateKey || '', 'utf8');

              case JwtSecretRequestType.VERIFY:
                return readFileSync(configuration.jwtPublicKey || '', 'utf8');
            }
          },
          signOptions: {
            expiresIn: configuration.jwtExpiry,
            issuer: configuration.jwtIssuer,
            algorithm: configuration.jwtAlgorithm
          }
        } as any;
      },
      inject: []
    })
  ],
  exports: [JwtRootModule]
})
export class JwtModule {}
