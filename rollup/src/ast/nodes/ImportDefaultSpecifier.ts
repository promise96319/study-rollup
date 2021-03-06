import Identifier from './Identifier';
import * as NodeType from './NodeType';
import { NodeBase } from './shared/Node';

export default class ImportDefaultSpecifier extends NodeBase {
	declare local: Identifier;
	declare type: NodeType.tImportDefaultSpecifier;
}
