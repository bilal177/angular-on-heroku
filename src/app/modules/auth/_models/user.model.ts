import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  password: string;
  fullName: string;
  username: string;
  email: string;
  pic: string;
  roles: number[];
  occupation: string;
  companyName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  firstName: string;
  lastName: string;
  emailSettings: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    }
  };

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password || '';
    this.fullName = user.fullname || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.city = user.city;
    this.state = user.state;
    this.postCode = user.postCode;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
