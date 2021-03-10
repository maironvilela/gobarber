import { container } from 'tsyringe';

import '@modules/users/providers';
import '../providers';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import IMailTemplateProvider from './MailTamplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTamplateProvider/implementations/HandlebarsMailTemplateProvider';



container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)


container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
)





