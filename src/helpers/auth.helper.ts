import { Auth } from './../interfaces/auth.dto';
import { User } from 'src/models/user';
import { Accesstoken } from './../models/accesstoken';

export async function getAuth(token: string): Promise<Auth> {
  if (token == null || token === 'null' || token === '') {
    throw new Error('Token is not available');
  }

  const accessToken = await Accesstoken.createQueryBuilder('accesstoken')
    .where('accesstoken.id = :id', { id: token })
    .getOne();

  if (!accessToken) {
    throw new Error('Invalid access token: ' + token);
  }
  return await getUserData(accessToken.userId, token);
}

export async function getUserData(userId: number, token: string): Promise<Auth> {
  try {
    const tgosprecmuser = await User.createQueryBuilder('user')
      .where('user.userId = :userId', { userId: userId })
      .getOne();

    const accesstoken = await Accesstoken.createQueryBuilder('accesstoken')
      .where('accesstoken.id = :token', { token: token })
      .andWhere('accesstoken.userId = :userId', { userId: userId })
      .getOne();

    if (!accesstoken) {
      throw {
        message: 'Invalid Token',
      };
    }

    return {
      accestoken: accesstoken,
      userdata: tgosprecmuser,
    };
  } catch (e) {
    throw e;
  }
}
