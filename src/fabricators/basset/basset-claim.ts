import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

interface Option {
  address: string;
  bAsset: string;
  recipient?: string;
}

export const fabricatebAssetClaim = ({
  address,
  bAsset,
  recipient,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const bAssetRewardAddress = addressProvider.blunaReward(bAsset);

  return [
    new MsgExecuteContract(address, bAssetRewardAddress, {
      // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/msg.rs#L46
      // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/user.rs#L16
      claim_rewards: {
        recipient, // always
      },
    }),
  ];
};
