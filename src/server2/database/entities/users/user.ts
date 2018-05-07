import * as Sequelize from "sequelize"
import { dataTypes } from "./../../dataTypes"
import { EntityClass } from "../../EntityClass";
import { DBModels } from "../..";
import { GroupType } from "./group";
import * as bcrypt from "bcrypt-node"


export type UserType = {
    id: number
    nom: string
    prenom: string
    login: string
    pwd: string

    getGroups: (opt?: Sequelize.FindOptions<GroupType>) => Promise<GroupType[]>
    setGroups: (values?: GroupType[]) => Promise<void>
} & Sequelize.Instance<any>

export type UserDBSet = {
    users: Sequelize.Model<UserType, any>
}

export class Entity_User extends EntityClass {
    table_name = "user_user"
    model_name = "users"
    model_attributes = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } as Sequelize.DefineAttributeColumnOptions,
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        prenom: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        login: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions,
        pwd: {
            type: dataTypes.STRING,
            allowNull: false,
        } as Sequelize.DefineAttributeColumnOptions
    }
    model_options: Sequelize.DefineOptions<UserType> = {
        hooks: {
            beforeCreate: (entity, options) => {
                return CryptPassword(entity.pwd)
                    .then((hash: string) => {
                        entity.pwd = hash;
                    })
                    .catch(err => {
                        if(err) console.log(err);
                    })
            }
        }
    }
    
    associations = (models: DBModels) => {
        this._model.belongsToMany(models.groups, {
            through: "user_user_has_user_group",
            as: "groups",
            foreignKey: "user_user_id"
        });
    }
}

export const CryptPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject(err);
            bcrypt.hash(password, salt, null, (err, hash: string) => {
                if(err) return reject(err);
                return resolve(hash);
            })
        })
    })
}

export const CheckPassword = (password: string, userPassword: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, same) => {
            if(err) reject(err);
            resolve(same);
        })
    })
}