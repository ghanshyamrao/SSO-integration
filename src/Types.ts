export interface User {
    accessToken: string;
    data: {
      email: string;
      email_verified: boolean;
      family_name: string;
      given_name: string;
      name: string;
      picture: string;
      sub: string;
    };
    name?: string;
    email?: string;
    picture?: string;
    microsoftProfile?: MicrosoftUserProfile;
    
  }
  
  export interface MicrosoftUserProfile {
    id: string;
    businessPhones: string[];
    displayName: string;
    givenName?: string | null;
    jobTitle?: string | null;
    mail?: string | null;
    mobilePhone?: string | null;
    officeLocation?: string | null;
    preferredLanguage?: string | null;
    surname?: string | null;
    userPrincipalName: string;
  }
  