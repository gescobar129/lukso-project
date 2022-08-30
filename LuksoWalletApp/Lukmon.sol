pragma solidity ^0.8.0;

import "https://github.com/lukso-network/lsp-universalprofile-smart-contracts/blob/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol";
import "https://github.com/lukso-network/lsp-universalprofile-smart-contracts/blob/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol";

contract Lukmon is LSP4DigitalAssetMetadata, LSP8IdentifiableDigitalAssetCore {

	bytes32 constant _Name = 0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af2;
	bytes32 constant _Img = 0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af8;

	uint totalLukmon;


	constructor(
		string memory name,
		string memory symbol,
		address newOwner,
		string memory img
	) LSP4DigitalAssetMetadata(name, symbol, newOwner) {
		totalLukmon = 0;

		// _registerInterface(_LSP8_INTERFACE_ID);
		// _setData(_LSP8_SUPPORTED_STANDARDS_KEY, abi.encodePacked(_LSP8_SUPPORTED_STANDARDS_VALUE));
		_setData(_Name, bytes(name));
		_setData(_Img, bytes(img));
	}

	function getMonInfo() public view returns (string memory, string memory) {
		return (string(_getData(_Name)), string(_getData(_Img)));
	}

	function mint(address newOwner) public {
		totalLukmon++;
		_mint(newOwner, bytes32(totalLukmon), true, abi.encodePacked(totalLukmon));
	}

	function transferMon(address from, address to, bytes32 tokenId, bool force, string memory data) public {
		_transfer(from, to, tokenId, force, bytes(data));
	}

}